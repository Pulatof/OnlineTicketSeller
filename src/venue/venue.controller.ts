import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { FindVenueDto } from './dto/find-venue.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}


  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @Get('find')
  getByParam(@Body() findVenueDto: FindVenueDto){
    return this.venueService.getByParam(findVenueDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }


  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(+id, updateVenueDto);
  }


  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(+id);
  }
}
