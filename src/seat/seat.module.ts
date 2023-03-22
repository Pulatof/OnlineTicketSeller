import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Seat } from './models/seat.model';
import { SeatType } from 'src/seat_type/models/seat_type.models';
import { Venue } from 'src/venue/models/venue.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Seat, SeatType, Venue]), JwtModule],
  controllers: [SeatController],
  providers: [SeatService]
})
export class SeatModule {}
