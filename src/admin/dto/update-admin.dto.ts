import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto {
    @ApiProperty({
        example: 'foydalanuvchi niki',
        description: 'Foydalanuvchi nikneymi',
      })
      @IsNotEmpty()
      @IsString()
      name?: string;
    
      @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
      @IsNotEmpty()
      @IsString()
      @MinLength(6)
      // @IsStrongPassword()
      password?: string;
    
      @ApiProperty({
        example: 'confirm_password',
        description: 'Foydalanuvchi parolini qayta tekshirish',
      })
      @IsNotEmpty()
      @IsString()
      @MinLength(6)
      // @IsStrongPassword()
      confirm_password?: string;
}
