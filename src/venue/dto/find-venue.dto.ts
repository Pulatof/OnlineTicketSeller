import { ApiProperty } from '@nestjs/swagger';
import {IsPhoneNumber, IsString } from 'class-validator';

export class FindVenueDto {
  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  // @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  // @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  // @IsNotEmpty()
  @IsString()
  site: string;

  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  // @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

}
