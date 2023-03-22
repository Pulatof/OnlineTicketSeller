import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TIME } from 'sequelize';
import { Op } from 'sequelize';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventDto } from './dto/find-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './models/event.model';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event) private readonly eventRepo: typeof Event) {}
  async create(createEventDto: CreateEventDto) {
    const event = await this.eventRepo.create(createEventDto);
    return event;
  }

  findAll() {
    return this.eventRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) {
      throw new BadRequestException('event not found');
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) {
      throw new BadRequestException('event not found');
    }
    const updatedevent = await this.eventRepo.update(
      { ...updateEventDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'event updated succesfully',
      event: updatedevent[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const event = await this.eventRepo.findOne({ where: { id: id } });
    if (!event) {
      throw new BadRequestException('event not found');
    }
    await this.eventRepo.destroy({ where: { id } });
    const response = {
      message: 'event deleted succesfully',
      EventID: id,
    };
    return response;
  }

  async getByParam(findEventDto: FindEventDto) {
    const params = { ...findEventDto };
    const where: any = {};
    if (params.name) {
      where.params.name = { [Op.like]: `%${params.name}%` };
    }
    if (params.start_date) {
      where.params.start_date = { [Op.eq]: new Date(params.start_date) };
    }
    if (params.finish_date) {
      where.params.finish_date = { [Op.eq]: new Date(params.finish_date) };
    }
    if (params.start_time) {
      where.params.start_time = { [Op.like]: `%${params.start_time}%` };
    }
    if (params.finish_time) {
      where.params.finish_time = { [Op.like]: `%${params.finish_time}%` };
    }
  }
}
