import { Module } from '@nestjs/common';
import { VenuePhotoService } from './venue_photo.service';
import { VenuePhotoController } from './venue_photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { VenuePhoto } from './models/venue_photo.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({imports:[SequelizeModule.forFeature([VenuePhoto]), JwtModule],
  controllers: [VenuePhotoController],
  providers: [VenuePhotoService]
})
export class VenuePhotoModule {}
