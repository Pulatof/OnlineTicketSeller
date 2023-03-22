import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './models/customer.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4,v4 } from 'uuid';
import { Response } from 'express';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { Op } from 'sequelize';
import { Otp } from '../otp/models/otp.model';
import { PhoneCustomerDto } from './dto/phone-customer.dto';
import { AddMinutesToDate } from '../helpers/adminutes';
import { dates, decode, encode } from '../helpers/crypto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import * as otpGenerator from 'otp-generator';
import { check } from 'prettier';


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    @InjectModel(Otp) 
    private readonly otpRepo: typeof Otp,
    private readonly customerRepo: typeof Customer,
    private readonly jwtService: JwtService,
  ) {}
  async registration(createCustomerDto: CreateCustomerDto, res: Response) {
    const customer = await this.customerRepo.findOne({
      where: { email: createCustomerDto.email },
    });
    if (customer) {
      throw new BadRequestException('customer already exists');
    }
    if (createCustomerDto.password !== createCustomerDto.confirm_password) {
      throw new BadRequestException('passwords is not match');
    }
    const hashed_password = await bcrypt.hash(createCustomerDto.password, 7);
    const newCustomer = await this.customerRepo.create({
      ...createCustomerDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newCustomer.id, newCustomer.birth_day);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();

    const updatedCustomer = await this.customerRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      // activation_link:uniqueKey },
      { where: { id: newCustomer.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer registered',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  async login(loginCustomerDto: LoginCustomerDto, res: Response) {
    const { email, password } = loginCustomerDto;
    const customer = await this.customerRepo.findOne({ where: { email } });
    if (!customer) {
      throw new UnauthorizedException('Customer not registered');
    }
    const isMatchPass = await bcrypt.compare(
      password,
      customer.hashed_password,
    );
    if (!isMatchPass) {
      throw new UnauthorizedException('Customer password is not match');
    }
    const tokens = await this.getTokens(customer.id, customer.birth_day);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedCustomer = await this.customerRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: customer.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer logged in',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!customerData) {
      throw new ForbiddenException('Customer not found');
    }
    const updatedCustomer = await this.customerRepo.update(
      { hashed_refresh_token: null },
      { where: { id: customerData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Customer logged out succesfully',
      customer: updatedCustomer[1][0],
    };
    return response;
  }

  async refreshToken(customer_id: number, refreshToken: string, res: Response) {
    const customer = await this.customerRepo.findOne({
      where: { id: customer_id },
    });
    if (!customer || !customer.hashed_refresh_token) {
      throw new BadRequestException('Customer not found');
    }
    const decodedToken = this.jwtService.decode(refreshToken);
    if (customer_id != decodedToken['id']) {
      throw new BadRequestException('Customer not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      customer.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(customer.id, customer.birth_day);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedCustomer = await this.customerRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: customer.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer refreshed',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  async updatePassword(
    customer_id: number,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const customer = await this.customerRepo.findOne({
      where: { id: customer_id },
    });
    if (!customer || !customer.hashed_refresh_token) {
      throw new BadRequestException('Customer not found');
    }
    const isMatchPass = await bcrypt.compare(
      updatePasswordDto.password,
      customer.hashed_password,
    );
    if (!isMatchPass) {
      throw new UnauthorizedException('Customer password is not match');
    }
    if (updatePasswordDto.new_password != updatePasswordDto.confirm_password) {
      throw new BadRequestException('password is not matched');
    }
    const hashed_password = await bcrypt.hash(
      updatePasswordDto.new_password,
      7,
    );

    const updatedCustomer = await this.customerRepo.update(
      { hashed_password: hashed_password },
      { where: { id: customer.id }, returning: true },
    );
    const response = {
      message: 'Password updated',
      customer: updatedCustomer[1][0],
    };
    return response;
  }

  async getTokens(customer_id: number, birth_day: Date) {
    const jwtPayload = {
      id: customer_id,
      birth_day,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  findAll() {
    return this.customerRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new BadRequestException('customer not found');
    }
    return customer;
  }

  async update(customer_id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne({
      where: { id: customer_id },
    });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    const updatedCustomer = await this.customerRepo.update(
      { ...updateCustomerDto },
      {
        where: { id: customer_id },
        returning: true,
      },
    );
    const response = {
      message: 'Customer updated successfully',
      customer: updatedCustomer[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne({ where: { id: id } });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    await this.customerRepo.destroy({ where: { id } });
    const response = {
      message: 'customer deleted succesfully',
      CustomerID: id,
    };
    return response;
  }

  async getByParam(findCustomerDto:FindCustomerDto){
    const params = {...findCustomerDto}
    const where: any = {}
    if(params.first_name){
      where.first_name = {[Op.like]:`%${params.first_name}%`}
    }
    if(params.last_name){
      where.last_name = {[Op.like]:`%${params.last_name}%`}
    }
    if(params.phone){
      where.phone = {[Op.like]:`%${params.phone}%`}
    }
    if(params.email){
      where.email = {[Op.like]:`%${params.email}%`}
    }
    const customer =  await this.customerRepo.findAll({where:where}) 
    return customer
  }

  async deactivate(id:number){
    const customer = await this.customerRepo.findOne({where: {id}})
    if(!customer){
      throw new NotFoundException("Customer not foun")
    }
    if(customer.is_active){
      const updatedCustomer = await this.customerRepo.update({is_active: false},{where: {id}})
      const response = {
        message: "Customer deactivated successfully",
        customer: updatedCustomer
      }
      return response
    } else{
      return `This customer is already deactive, customer: ${customer.first_name}`
    }
  }

  async newOTP(phoneCustomerDto: PhoneCustomerDto) {
    const phone_number = phoneCustomerDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // const isSend = await this.botService.sendOTP(phone_number, otp);
    // if (!isSend) {
    //   throw new HttpException('Botdan royxatdan oting', HttpStatus.BAD_REQUEST);
    // }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({
      where: { [Op.and]: [{ check: phone_number }, { verify: false }] },
    });
    const newOtp = await this.otpRepo.create({
      id:v4(),
      otp: otp,
      expiration_time,
      check: phone_number,
    });
    const details = {
      timestamp: now,
      chek: phone_number,
      success: true,
      message: 'OTP sent to customer',
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));
    console.log(encode)
    return { status: 'Success', Details: encoded };

  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {

    const { verification_key, otp, code } = verifyOtpDto;
    const currentdate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;
    if (!check_obj) {
      throw new BadRequestException('Otp bu raqamga yuborilmagan');
    }
    const result = await this.otpRepo.findOne({
      where: { id: obj.otp_id },
    });
    if (result != null) {
      if (!result.verify) {
        if (dates.compare(result.expiration_time, currentdate)) {
          if (otp === result.otp) {
            const updatedCustomer = await this.customerRepo.update(
              { is_active:false },
              { where: {  phone:check_obj }, returning: true },
            );
            const customer = updatedCustomer[1][0];
            const tokens = await this.getTokens(
              // id: customer_id,
              // customer: birth_day,
              customer.id, customer.birth_day
              
            );
            res.cookie('refresh_token', tokens.refresh_token, {
              maxAge: 15 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            const hashed_refresh_token = await bcrypt.hash(
              tokens.refresh_token,
              7,
            );
            const newUpdatedCustomer = await this.customerRepo.update(
              { hashed_refresh_token: hashed_refresh_token },
              { where: { id: customer.id } },
            );
            console.log(newUpdatedCustomer);
            const response = {
              message:
                'Tabriklaymiz, egani faollashtirish muvaffaqqiyatli yakunlandi',
              owner: newUpdatedCustomer,
              tokens: tokens,
            };
            return response;
          } else {
            throw new BadRequestException('Otp is not match');
          }
        } else {
          throw new BadRequestException('Otp expired');
        }
      } else {
        throw new BadRequestException('Otp already customer');
      }
    } else {
      throw new BadRequestException("Bunday foydalanuvchi yo'q");
    }
  }
  

  // async newOtp (phoneCustomerDto: PhoneCustomerDto, phone:string) {
  //   const code = generateOtp();
  
  //   // Save OTP to database
  //   const otp = await Otp.create({
  //     phone,
  //     code
  //   });
  
  //   // Send SMS
  //   await sendSms(phone, code);
  
  //   return otp;
  // }



  // async verifyOtp(phone: string, code: string) {
  //   const otp = await Otp.findOne({
  //     where: {
  //       phone,
  //       code
  //     }
  //   });
  
  //   if (!otp) {
  //     return false;
  //   }
  
  //   // Delete OTP from database
  //   await otp.destroy();
  
  //   return true;
  // }
    



}
