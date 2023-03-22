import { Module } from '@nestjs/common';
import { VenueTypeService } from './venue_type.service';
import { VenueTypeController } from './venue_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VenueType } from './models/venue_type.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([VenueType,]), JwtModule],
  controllers: [VenueTypeController],
  providers: [VenueTypeService]
})
export class VenueTypeModule {}
