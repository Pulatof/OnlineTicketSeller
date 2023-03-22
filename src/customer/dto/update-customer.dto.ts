import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto {
    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
     
      @IsNotEmpty()
      @IsString()
      @IsOptional()
      first_name?: string;
    
      @ApiProperty({
        example: 'user familiasi',
        description: 'Foydalanuvchi familiasi & Lastname of user',
      })

      @IsNotEmpty()
      @IsString()
      @IsOptional()
      last_name?: string;
    
      @ApiProperty({ example: '901234567', description: 'Foydalanuvchi telefoni' })
  
      @IsPhoneNumber()
      @IsOptional()
      phone?: string;
    
      @ApiProperty({ example: 'email', description: 'Foydalanuvchi e-pochtasi' })
 
      @IsEmail()
      @IsOptional()
      email?: string;
    
      @ApiProperty({
        example: '01.01.2000',
        description: 'Foydalanuvchi tugilgan sanasii',
      })
   
      @IsNotEmpty()
      @IsDateString()
       @IsOptional()
      birth_day?: Date;
    
      @ApiProperty({
        example: '01.01.2000',
        description: 'Foydalanuvchi tugilgan sanasii',
      })

      @IsNotEmpty()
      @IsNumber()
      @IsOptional()
      lang_id?: number;
}
