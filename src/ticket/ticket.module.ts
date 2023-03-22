import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';
import { Event } from 'src/event/models/event.model';
import { Seat } from 'src/seat/models/seat.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Ticket, Event, Seat ]), JwtModule],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
