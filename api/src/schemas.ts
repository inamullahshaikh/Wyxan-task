import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Person {
  @Prop({ type: String, required: true })
  _id: string; // slug, e.g. 'wren'

  @Prop({ required: true })
  name: string;
}
export const PersonSchema = SchemaFactory.createForClass(Person);

@Schema({ versionKey: false, timestamps: true })
export class Site {
  @Prop({ type: String, required: true })
  _id: string; // the address, e.g. 'tidepool.zz'

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  html: string; // sanitized on write

  @Prop({ required: true })
  text: string; // plain text of html, for search

  @Prop({ required: true })
  authorId: string;
}
export const SiteSchema = SchemaFactory.createForClass(Site);
SiteSchema.index(
  { title: 'text', text: 'text' },
  { name: 'search', weights: { title: 10, text: 1 }, default_language: 'english' },
);

export const VIA = ['typed', 'link', 'search', 'history', 'back', 'forward', 'publish'] as const;
export type Via = (typeof VIA)[number];

@Schema({ versionKey: false })
export class Visit {
  @Prop({ required: true })
  personId: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: '' })
  title: string; // as seen at the time; empty for Nowhere

  @Prop({ required: true })
  found: boolean;

  @Prop({ type: String, required: true, enum: VIA })
  via: Via;

  @Prop({ type: String, default: null })
  from: string | null; // address it was reached from

  @Prop({ default: Date.now })
  at: Date; // set by the server, never the client

  @Prop()
  seeded?: boolean;
}
export const VisitSchema = SchemaFactory.createForClass(Visit);
VisitSchema.index({ personId: 1, at: -1, _id: -1 });
