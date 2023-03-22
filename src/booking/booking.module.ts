import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './models/booking.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Booking]), JwtModule],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
