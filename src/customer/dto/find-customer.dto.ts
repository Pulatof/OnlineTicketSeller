import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class FindCustomerDto {
  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'user familiasi',
    description: 'Foydalanuvchi familiasi & Lastname of user',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: '901234567', description: 'Foydalanuvchi telefoni' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'email', description: 'Foydalanuvchi e-pochtasi' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '01.01.2000',
    description: 'Foydalanuvchi tugilgan sanasii',
  })
  // @IsNotEmpty()
  @IsDateString()
  birth_day: Date;
}
