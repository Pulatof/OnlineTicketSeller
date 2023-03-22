import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './models/event.model';
import { EventType } from 'src/event_type/models/event_type.model';
import { HumanCategory } from 'src/human_category/models/human_category.model';
import { Venue } from 'src/venue/models/venue.model';
import { Lang } from 'src/lang/models/lang.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Event, EventType, HumanCategory, Venue, Lang]), JwtModule],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
