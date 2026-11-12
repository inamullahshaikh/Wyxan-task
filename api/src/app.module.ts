import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleController } from './people.controller.js';
import { Person, PersonSchema, Site, SiteSchema, Visit, VisitSchema } from './schemas.js';
import { SitesController } from './sites.controller.js';
import { VisitsController } from './visits.controller.js';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL ?? 'mongodb://localhost:27017/smallweb'),
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: Site.name, schema: SiteSchema },
      { name: Visit.name, schema: VisitSchema },
    ]),
  ],
  controllers: [PeopleController, SitesController, VisitsController],
})
export class AppModule {}
