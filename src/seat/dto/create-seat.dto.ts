import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  // @IsNotEmpty()
  @IsNumber()
  sector: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  // @IsNotEmpty()
  @IsNumber()
  row_number: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  // @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  // @IsNotEmpty()
  @IsNumber()
  venue_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  // @IsNotEmpty()
  @IsNumber()
  seat_type_id: number;

  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  // @IsNotEmpty()
  @IsString()
  location_in_schema: string;
}
