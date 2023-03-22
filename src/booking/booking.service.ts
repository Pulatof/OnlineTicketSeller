import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './models/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    private readonly bookingRepo:typeof Booking
  ){}

  async create(createBookingDto: CreateBookingDto) {
    const booking = await this.bookingRepo.create(createBookingDto)
    return booking
  }

  findAll() {
    return this.bookingRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const booking = await this.bookingRepo.findOne({ where: { id } });
    if (!booking) {
      throw new BadRequestException('booking not found');
    }
    return booking;
  }

  async update(booking_id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepo.findOne({ where: { id: booking_id } });
    if (!booking) {
      throw new BadRequestException('booking not found');
    }
    const updatedbooking = await this.bookingRepo.update(
      {...updateBookingDto },
      {
        where: { id: booking_id },
        returning: true,
      },
    );
    const response = {
      message: 'booking updated successfully',
      booking: updatedbooking[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const booking = await this.bookingRepo.findOne({ where: { id: id } });
    if (!booking) {
      throw new BadRequestException('booking not found');
    }
    await this.bookingRepo.destroy({ where: { id } });
    const response = {
      message: 'booking deleted succesfully',
      BookingID: id,
    };
    return response;
  }





}
