import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './models/ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket) private readonly ticketRepo:typeof Ticket
  ){}
  async create(createTicketDto: CreateTicketDto) {
    const ticket = await this.ticketRepo.create(createTicketDto)
    return ticket
  }

  findAll() {

    return this.ticketRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepo.findOne({where:{id}})
    if (!ticket){
      throw new BadRequestException('ticket not found')
    }
    return ticket
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket =  await this.ticketRepo.findOne({where:{id}})
    if (!ticket){
      throw new BadRequestException('ticket not found')

    }
    const updatedticket = await this.ticketRepo.update(
      {...updateTicketDto},
      {where:{id}, returning:true})
      const response = {
        message:'ticket updated succesfully',
        seat : updatedticket[1][0]
      }
      return response
  }

  async remove(id: number) {
    const ticket = await this.ticketRepo.findOne({ where: { id: id } });
    if (!ticket) {
      throw new BadRequestException('seat not found');
    }
    await this.ticketRepo.destroy({ where: { id } });
    const response = {
      message: 'ticket deleted succesfully',
      TickedID: id,
    };
    return response;
  }
}
