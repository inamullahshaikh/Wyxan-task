import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Model, Types } from 'mongoose';
import { toAddress } from './address.js';
import { Person, VIA, Visit, type Via } from './schemas.js';

class RecordVisit {
  @IsString()
  personId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  address: string; // a .zz address, or whatever led Nowhere (e.g. https://…)

  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsBoolean()
  found: boolean;

  @IsIn(VIA)
  via: Via;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  from?: string | null;
}

class HistoryQuery {
  @IsString()
  personId: string;

  @IsOptional()
  @IsISO8601()
  before?: string; // alone: "jump to time"; with beforeId: the next-page cursor

  @IsOptional()
  @IsMongoId()
  beforeId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 50;
}

@Controller('visits')
export class VisitsController {
  constructor(
    @InjectModel(Visit.name) private readonly visits: Model<Visit>,
    @InjectModel(Person.name) private readonly people: Model<Person>,
  ) {}

  /** The client says how it arrived; the server says when. */
  @Post()
  async record(@Body() v: RecordVisit) {
    if (!(await this.people.exists({ _id: v.personId }))) throw new BadRequestException('unknown person');
    const clean = (a: string) => toAddress(a) ?? a.trim();
    const visit = await this.visits.create({
      personId: v.personId,
      address: clean(v.address),
      title: v.title?.trim() ?? '',
      found: v.found,
      via: v.via,
      from: v.from ? clean(v.from) : null,
    });
    return { id: visit._id, at: visit.at };
  }

  /** Newest first. Pass `next` back as before/beforeId to get the page after this one. */
  @Get()
  async history(@Query() q: HistoryQuery) {
    const before = q.before ? new Date(q.before) : undefined;
    const filter: Record<string, unknown> = { personId: q.personId };
    if (before && q.beforeId) {
      const id = new Types.ObjectId(q.beforeId);
      filter.$or = [{ at: { $lt: before } }, { at: before, _id: { $lt: id } }];
    } else if (before) {
      filter.at = { $lte: before };
    }
    const rows = await this.visits.find(filter).sort({ at: -1, _id: -1 }).limit(q.limit).lean();
    const last = rows.at(-1);
    return {
      visits: rows.map((r) => ({
        id: r._id,
        address: r.address,
        title: r.title,
        found: r.found,
        via: r.via,
        from: r.from,
        at: r.at,
      })),
      next: rows.length === q.limit && last ? { before: last.at, beforeId: last._id } : null,
    };
  }
}
