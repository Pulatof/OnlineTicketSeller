import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { VenuePhoto } from './models/venue_photo.model';

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto) private readonly venue_photoRepo:typeof VenuePhoto
  ){}
  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const venue_photo = await this.venue_photoRepo.create(createVenuePhotoDto)
    return venue_photo}

  findAll() {
    return this.venue_photoRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const venue_photo = await this.venue_photoRepo.findOne({where:{id}})
    if (!venue_photo){
      throw new BadRequestException('venue_photo not found')
    }
    return venue_photo
  }

  async update(id: number, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    const venue_photo =  await this.venue_photoRepo.findOne({where:{id}})
    if (!venue_photo){
      throw new BadRequestException('venue_photo not found')
    }
    const updatedvenue_photo= await this.venue_photoRepo.update(
      {...updateVenuePhotoDto},
      {where:{id}, returning:true})
      const response = {
        message:'venue_photo updated succesfully',
        venue_photo : updatedvenue_photo[1][0]
      }
      return response
  }

  async remove(id: number) {
    const venue_photo = await this.venue_photoRepo.findOne({ where: { id: id } });
    if (!venue_photo) {
      throw new BadRequestException('seat not found');
    }
    await this.venue_photoRepo.destroy({ where: { id } });
    const response = {
      message: 'venue_photo deleted succesfully',
      VenuePhotoID: id,
    };
    return response;
  }
}
