import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateEventTypeDto } from './create-event_type.dto';

export class UpdateEventTypeDto {
  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  parent_event_type_id?: number;
}
