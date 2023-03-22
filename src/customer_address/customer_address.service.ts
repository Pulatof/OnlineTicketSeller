import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';
import { CustomerAddress } from './models/customer_address.model';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress)
    private readonly customer_addressRepo:typeof CustomerAddress
  ){}
  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const customer_address = await this.customer_addressRepo.create(createCustomerAddressDto)
    return customer_address
  }

  findAll() {
    return this.customer_addressRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const customer_address = await this.customer_addressRepo.findOne({where:{id}})
    if (!customer_address){
      throw new BadRequestException('customer_address not found')
    }
    return customer_address
  }

  async update(id: number, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    const customer_address =  await this.customer_addressRepo.findOne({where:{id}})
    if (!customer_address){
      throw new BadRequestException('customer_address not found')

    }
    const updatedcustomer_address = await this.customer_addressRepo.update(
      {...updateCustomerAddressDto},
      {where:{id}, returning:true})
      const response = {
        message:'customer_address updated succesfully',
        customer_address : updatedcustomer_address[1][0]
      }
      return response
  }

  async remove(id: number) {
    const customer_address = await this.customer_addressRepo.findOne({ where: { id: id } });
    if (!customer_address) {
      throw new BadRequestException('customer_address not found');
    }
    await this.customer_addressRepo.destroy({ where: { id } });
    const response = {
      message: 'customer_address deleted succesfully',
      CustomerAddressID: id,
    };
    return response;
  }
}
