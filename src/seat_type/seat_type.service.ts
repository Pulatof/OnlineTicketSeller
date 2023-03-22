import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { SeatType } from './models/seat_type.models';

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType) private readonly seat_typeRepo:typeof SeatType
  ){}
  async create(createSeatTypeDto: CreateSeatTypeDto) {
    const seat_type = await this.seat_typeRepo.create(createSeatTypeDto)
    return seat_type
  }

  findAll() {
    return this.seat_typeRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const seat_type = await this.seat_typeRepo.findOne({where:{id}})
    if (!seat_type){
      throw new BadRequestException('seat not found')
    }
    return seat_type
  }

  async update(id: number, updateSeatTypeDto: UpdateSeatTypeDto) {
    const seat_type =  await this.seat_typeRepo.findOne({where:{id}})
    if (!seat_type){
      throw new BadRequestException('seat_type not found')

    }
    const updatedseat_type = await this.seat_typeRepo.update(
      {...updateSeatTypeDto},
      {where:{id}, returning:true})
      const response = {
        message:'seat_type updated succesfully',
        seat : updatedseat_type[1][0]
      }
      return response
  }

  async remove(id: number) {
    const seat_type = await this.seat_typeRepo.findOne({ where: { id: id } });
    if (!seat_type) {
      throw new BadRequestException('seat_type not found');
    }
    await this.seat_typeRepo.destroy({ where: { id } });
    const response = {
      message: 'seat_type deleted succesfully',
      SeatTypeID: id,
    };
    return response;
  }
}
