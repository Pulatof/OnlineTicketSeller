import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { VenueType } from './models/venue_type.model';

@Injectable()
export class VenueTypeService {
  constructor(@InjectModel(VenueType) private readonly venue_typeRepo:typeof VenueType){}
  async create(createVenueTypeDto: CreateVenueTypeDto) {
    const venue_type = await this.venue_typeRepo.create(createVenueTypeDto)
    return venue_type
  }

  findAll() {
    return this.venue_typeRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const venue_type = await this.venue_typeRepo.findOne({where:{id}})
    if (!venue_type){
      throw new BadRequestException('venue_type not found')
    }
    return venue_type
  }

  async update(id: number, updateVenueTypeDto: UpdateVenueTypeDto) {
    const venue_type =  await this.venue_typeRepo.findOne({where:{id}})
    if (!venue_type){
      throw new BadRequestException('venue_type not found')

    }
    const updatedvenue_type = await this.venue_typeRepo.update(
      {...updateVenueTypeDto},
      {where:{id}, returning:true})
      const response = {
        message:'venue_type updated succesfully',
        venue_type : updatedvenue_type[1][0]
      }
      return response
  }

  async remove(id: number) {
    const venue_type = await this.venue_typeRepo.findOne({ where: { id: id } });
    if (!venue_type) {
      throw new BadRequestException('seat not found');
    }
    await this.venue_typeRepo.destroy({ where: { id } });
    const response = {
      message: 'venue_type deleted succesfully',
      VenueTypeID: id,
    };
    return response;
  }

}
