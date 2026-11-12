import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module.js';
import { sanitize } from '../sanitize.js';
import { Person, Site } from '../schemas.js';
import { PEOPLE, SITES } from './data.js';

// Fixed, so the same command always produces the same web.
const SEEDED_AT = new Date('2026-10-01T09:00:00Z');

const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
const people = app.get<Model<Person>>(getModelToken(Person.name));
const sites = app.get<Model<Site>>(getModelToken(Site.name));

// Upsert by _id: seeding twice changes nothing; sites published by people are left alone.
await people.bulkWrite(
  PEOPLE.map((p) => ({ replaceOne: { filter: { _id: p._id }, replacement: p, upsert: true } })),
);
await sites.bulkWrite(
  SITES.map((s) => {
    const { html, text } = sanitize(s.html);
    const replacement = { _id: s.address, title: s.title, html, text, authorId: s.authorId };
    return {
      replaceOne: {
        filter: { _id: s.address },
        replacement: { ...replacement, createdAt: SEEDED_AT, updatedAt: SEEDED_AT },
        upsert: true,
      },
    };
  }),
  { timestamps: false },
);

console.log(`people: ${await people.countDocuments()}, sites: ${await sites.countDocuments()}`);
await app.close();
