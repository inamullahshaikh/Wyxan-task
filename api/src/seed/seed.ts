import { NestFactory } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AppModule } from '../app.module.js';
import { sanitize } from '../sanitize.js';
import { Person, Site, Visit, type Via } from '../schemas.js';
import { PEOPLE, SESSIONS, SITES, type Session } from './data.js';

// Fixed, so the same command always produces the same web.
const SEEDED_AT = new Date('2026-10-01T09:00:00Z');
const HOUR_START = Date.UTC(2026, 9, 31, 19, 0, 0);

const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
const people = app.get<Model<Person>>(getModelToken(Person.name));
const sites = app.get<Model<Site>>(getModelToken(Site.name));
const visits = app.get<Model<Visit>>(getModelToken(Visit.name));

if (process.argv.includes('--reset')) {
  await app.get<Connection>(getConnectionToken()).dropDatabase();
  await Promise.all([people, sites, visits].map((m) => m.syncIndexes())); // dropping took the text index with it
}

// Upsert by _id: seeding twice changes nothing; sites published by people are left alone.
await people.bulkWrite(
  PEOPLE.map((p) => ({ replaceOne: { filter: { _id: p._id }, replacement: p, upsert: true } })),
);
const pages = new Map(SITES.map((s) => [s.address, { title: s.title, ...sanitize(s.html) }]));
await sites.bulkWrite(
  SITES.map((s) => {
    const { title, html, text } = pages.get(s.address)!;
    const replacement = { _id: s.address, title, html, text, authorId: s.authorId, createdAt: SEEDED_AT, updatedAt: SEEDED_AT };
    return { replaceOne: { filter: { _id: s.address }, replacement, upsert: true } };
  }),
  { timestamps: false },
);

// Seeded history is replaced wholesale; visits people made since are kept.
await visits.deleteMany({ seeded: true });
await visits.insertMany(SESSIONS.flatMap(replay));

const [p, s, v, all] = await Promise.all([
  people.countDocuments(),
  sites.countDocuments(),
  visits.countDocuments({ seeded: true }),
  visits.countDocuments(),
]);
console.log(`people: ${p}, sites: ${s}, seeded visits: ${v} (all visits: ${all})`);
await app.close();

/** Walk one tab's session the way the browser will: a stack, an index, forward lost on a new navigation. */
function replay({ personId, startMinute, steps }: Session) {
  const stack: string[] = [];
  let index = -1;
  let at = HOUR_START + startMinute * 60_000;
  return steps.map((step, n) => {
    const [via, target] = step.split(' ') as [Via, string?];
    const from = stack[index] ?? null;
    let address: string;
    if (via === 'back' || via === 'forward') {
      index += via === 'back' ? -1 : 1;
      address = stack[index];
      if (!address) throw new Error(`${personId}: nothing to go ${via} to at step ${n}`);
    } else {
      address = target!;
      if (via === 'link' && !(from && pages.get(from)?.html.includes(`href="${address}"`)))
        throw new Error(`${personId}: ${from} has no link to ${address}`);
      if (address === from) stack[index] = address; // same address replaces, like a browser
      else stack.splice(++index, Infinity, address); // forward is lost
    }
    at += (60 + ((n * 53) % 90)) * 1000; // 1–2.5 min a page, deterministic
    const page = pages.get(address);
    return {
      personId,
      address,
      title: page?.title ?? '',
      found: !!page,
      via,
      from: via === 'link' || via === 'back' || via === 'forward' ? from : null,
      at: new Date(at),
      seeded: true,
    };
  });
}
