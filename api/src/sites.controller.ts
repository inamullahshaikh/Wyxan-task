import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toAddress } from './address.js';
import { Person, Site } from './schemas.js';

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

  /** One query for every author id → lookup that falls back to the id if the person is gone. */
  private async authors(ids: string[]) {
    const people = await this.people.find({ _id: { $in: [...new Set(ids)] } }).lean();
    const names = new Map(people.map((p) => [p._id, p.name]));
    return (id: string) => ({ id, name: names.get(id) ?? id });
  }
}
