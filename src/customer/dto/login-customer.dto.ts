import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class LoginCustomerDto {
  @ApiProperty({ example: 'email', description: 'Foydalanuvchi e-pochtasi' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
