import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/guards/customer.guard';
import { CustomerAddressService } from './customer_address.service';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';

@Controller('customer-address')
export class CustomerAddressController {
  constructor(private readonly customerAddressService: CustomerAddressService) {}

  @Post()
  create(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerAddressDto);
  }

  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerAddressService.findOne(+id);
  }


  @UseGuards(CustomerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return this.customerAddressService.update(+id, updateCustomerAddressDto);
  }


  @UseGuards(CustomerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerAddressService.remove(+id);
  }
}
