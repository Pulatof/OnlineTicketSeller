import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerCartService } from './customer_cart.service';
import { CreateCustomerCartDto } from './dto/create-customer_cart.dto';
import { UpdateCustomerCartDto } from './dto/update-customer_cart.dto';

@Controller('customer-cart')
export class CustomerCartController {
  constructor(private readonly customerCartService: CustomerCartService) {}

  @Post()
  create(@Body() createCustomerCartDto: CreateCustomerCartDto) {
    return this.customerCartService.create(createCustomerCartDto);
  }

  @Get()
  findAll() {
    return this.customerCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerCartDto: UpdateCustomerCartDto) {
    return this.customerCartService.update(+id, updateCustomerCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerCartService.remove(+id);
  }
}
