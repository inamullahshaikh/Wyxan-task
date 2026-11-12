import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from './schemas.js';

@Controller('people')
export class PeopleController {
  constructor(@InjectModel(Person.name) private readonly people: Model<Person>) {}

  @Get()
  list() {
    return this.people.find().sort({ name: 1 }).lean();
  }
}
