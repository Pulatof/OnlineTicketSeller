import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';
import { EventType } from './models/event_type.model';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType)
    private readonly event_typeRepo:typeof EventType
  ){}
  async create(createEventTypeDto: CreateEventTypeDto) {
    const event_type = await this.event_typeRepo.create(createEventTypeDto)
  }

  findAll() {
    return this.event_typeRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const event_type = await this.event_typeRepo.findOne({where:{id}})
    if (!event_type){
      throw new BadRequestException('event_type not found')
    }
    return event_type
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    const event_type =  await this.event_typeRepo.findOne({where:{id}})
    if (!event_type){
      throw new BadRequestException('event_type not found')

    }
    const updatedevent_type = await this.event_typeRepo.update(
      {...updateEventTypeDto},
      {where:{id}, returning:true})
      const response = {
        message:'event_type updated succesfully',
        event : updatedevent_type[1][0]
      }
      return response
  }

  async remove(id: number) {
    const event_type = await this.event_typeRepo.findOne({ where: { id: id } });
    if (!event_type) {
      throw new BadRequestException('event_type not found');
    }
    await this.event_typeRepo.destroy({ where: { id } });
    const response = {
      message: 'event_type deleted succesfully',
      EventTypeID: id,
    };
    return response;
  }
}
