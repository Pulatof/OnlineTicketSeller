import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'foydalanuvchi niki',
    description: 'Foydalanuvchi nikneymi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'foydalanuvchi niki',
    description: 'Foydalanuvchi nikneymi',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
  @IsStrongPassword()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'confirm_password',
    description: 'Foydalanuvchi parolini qayta tekshirish',
  })
  @IsStrongPassword()
  @MinLength(6)
  confirm_password: string;
}
