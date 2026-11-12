import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  PayloadTooLargeException,
  Post,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import type { Response } from 'express';
import { Model } from 'mongoose';
import { toAddress } from './address.js';
import { sanitize } from './sanitize.js';
import { Person, Site } from './schemas.js';

const MAX_HTML_BYTES = 64 * 1024;

class PublishDto {
  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  authorId: string;
}

@Controller('sites')
export class SitesController {
  constructor(
    @InjectModel(Site.name) private readonly sites: Model<Site>,
    @InjectModel(Person.name) private readonly people: Model<Person>,
  ) {}

  @Get()
  async list() {
    const sites = await this.sites.find({}, { title: 1, authorId: 1 }).sort({ _id: 1 }).lean();
    const author = await this.authors(sites.map((s) => s.authorId));
    return sites.map((s) => ({ address: s._id, title: s.title, author: author(s.authorId) }));
  }

  @Get(':address')
  async get(@Param('address') raw: string) {
    const address = toAddress(raw);
    const site = address && (await this.sites.findById(address, { title: 1, html: 1, authorId: 1 }).lean());
    if (!site) throw new NotFoundException('No such address');
    const author = await this.authors([site.authorId]);
    return { address: site._id, title: site.title, html: site.html, author: author(site.authorId) };
  }

  /** Create (201), republish your own (200), or someone else's address (409). */
  @Post()
  async publish(@Body() dto: PublishDto, @Res({ passthrough: true }) res: Response) {
    const address = toAddress(dto.address);
    if (!address) throw new BadRequestException('address must look like name.zz');
    const title = dto.title.trim();
    if (!title) throw new BadRequestException('title should not be empty');
    if (Buffer.byteLength(dto.html) > MAX_HTML_BYTES) throw new PayloadTooLargeException('html is over 64 KB');
    if (!(await this.people.exists({ _id: dto.authorId }))) throw new BadRequestException('unknown author');

    const { html, text } = sanitize(dto.html);
    try {
      // One atomic statement: matches only the owner's site; for anyone else the upsert hits the taken _id.
      const r = await this.sites.updateOne(
        { _id: address, authorId: dto.authorId },
        { $set: { title, html, text } },
        { upsert: true },
      );
      res.status(r.upsertedCount ? 201 : 200);
    } catch (e) {
      if ((e as { code?: number }).code === 11000) throw new ConflictException(`${address} belongs to someone else`);
      throw e;
    }
    const author = await this.authors([dto.authorId]);
    return { address, title, author: author(dto.authorId) };
  }

  /** One query for every author id → lookup that falls back to the id if the person is gone. */
  private async authors(ids: string[]) {
    const people = await this.people.find({ _id: { $in: [...new Set(ids)] } }).lean();
    const names = new Map(people.map((p) => [p._id, p.name]));
    return (id: string) => ({ id, name: names.get(id) ?? id });
  }
}
