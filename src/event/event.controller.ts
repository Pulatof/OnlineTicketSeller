import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FindEventDto } from './dto/find-event.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}



  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get('find')
  getByParam(@Body() findEventDto:FindEventDto ){
    return this.eventService.getByParam(findEventDto)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }




  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }


  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
