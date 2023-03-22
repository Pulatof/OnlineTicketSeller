import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './models/seat.model';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat) private readonly seatRepo:typeof Seat
  ){}
  async create(createSeatDto: CreateSeatDto) {
    const seat = await this.seatRepo.create(createSeatDto)
    return seat
  }

  findAll() {
    return this.seatRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const seat = await this.seatRepo.findOne({where:{id}})
    if (!seat){
      throw new BadRequestException('seat not found')
    }
    return seat
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    const seat =  await this.seatRepo.findOne({where:{id}})
    if (!seat){
      throw new BadRequestException('seat not found')

    }
    const updatedseat = await this.seatRepo.update(
      {...updateSeatDto},
      {where:{id}, returning:true})
      const response = {
        message:'seat updated succesfully',
        seat : updatedseat[1][0]
      }
      return response
  }

  async remove(id: number) {
    const seat = await this.seatRepo.findOne({ where: { id: id } });
    if (!seat) {
      throw new BadRequestException('seat not found');
    }
    await this.seatRepo.destroy({ where: { id } });
    const response = {
      message: 'seat deleted succesfully',
      SeatID: id,
    };
    return response;
  }
}
