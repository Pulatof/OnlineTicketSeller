import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerCartDto } from './dto/create-customer_cart.dto';
import { UpdateCustomerCartDto } from './dto/update-customer_cart.dto';
import { CustomerCart } from './models/customer_cart.model';

@Injectable()
export class CustomerCartService {
  constructor(
    @InjectModel(CustomerCart)
    private readonly customer_cartRepo:typeof CustomerCart
  ){}
  async create(createCustomerCartDto: CreateCustomerCartDto) {
    const customer_cart = await this.customer_cartRepo.create(createCustomerCartDto)
    return customer_cart
  }

  findAll() {
    return this.customer_cartRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const customer_cart = await this.customer_cartRepo.findOne({where:{id}})
    if (!customer_cart){
      throw new BadRequestException('customer_cart not found')
    }
    return customer_cart
  }

  async update(id: number, updateCustomerCartDto: UpdateCustomerCartDto) {
    const customer_cart =  await this.customer_cartRepo.findOne({where:{id}})
    if (!customer_cart){
      throw new BadRequestException('customer_cart not found')

    }
    const updatedcustomer_cart = await this.customer_cartRepo.update(
      {...updateCustomerCartDto},
      {where:{id}, returning:true})
      const response = {
        message:'customer_cart updated succesfully',
        customer_cart : updatedcustomer_cart[1][0]
      }
      return response
  }

  async remove(id: number) {
    const customer_cart = await this.customer_cartRepo.findOne({ where: { id: id } });
    if (!customer_cart) {
      throw new BadRequestException('customer_cart not found');
    }
    await this.customer_cartRepo.destroy({ where: { id } });
    const response = {
      message: 'customer_cart deleted succesfully',
      CustomerCartID: id,
    };
    return response;
  }

}

