import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindEventDto } from 'src/event/dto/find-event.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { FindVenueDto } from './dto/find-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './models/venue.model';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue) private readonly venueRepo:typeof Venue
  ){}
  async create(createVenueDto: CreateVenueDto) {
    const venue = await this.venueRepo.create(createVenueDto)
    return venue
  }

  findAll() {
    return this.venueRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const venue = await this.venueRepo.findOne({where:{id}})
    if (!venue){
      throw new BadRequestException('venue not found')
    }
    return venue
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    const venue =  await this.venueRepo.findOne({where:{id}})
    if (!venue){
      throw new BadRequestException('venue not found')

    }
    const updatedvenue = await this.venueRepo.update(
      {...updateVenueDto},
      {where:{id}, returning:true})
      const response = {
        message:'venue updated succesfully',
        venue : updatedvenue[1][0]
      }
      return response
  }

  async remove(id: number) {
    const venue = await this.venueRepo.findOne({ where: { id: id } });
    if (!venue) {
      throw new BadRequestException('seat not found');
    }
    await this.venueRepo.destroy({ where: { id } });
    const response = {
      message: 'venue deleted succesfully',
      VenueID: id,
    };
    return response;
  }

  async getByParam(findVenueDto:FindVenueDto){
    const params = {...findVenueDto}
    const where:any={}
    if(params.name){
      where.name = {[Op.like]:`%${params.name}%`}
    }
    if(params.address){
      where.address = {[Op.like]:`%${params.address}%`}
    }
    if(params.phone){
      where.phone = {[Op.like]:`%${params.phone.trimStart()}%`}
    }
    if(params.site){
      where.site = {[Op.like]:`%${params.site}%`}
    }
    const venue = await this.venueRepo.findAll({where:where})
    return venue
  }
}
