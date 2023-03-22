
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';


export class FindAdminDto  {
    @ApiProperty({
        example: 'foydalanuvchi niki',
        description: 'Foydalanuvchi nikneymi',
      })

      name?: string;

}
