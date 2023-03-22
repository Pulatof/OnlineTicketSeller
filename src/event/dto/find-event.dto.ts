import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class FindEventDto {

    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsString()
    name:string

    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsDateString()
    start_date:Date

    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsString()
    start_time:string

    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsDateString()
    finish_date:Date

    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsString()
    finish_time:string

    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      // @IsNotEmpty()
      @IsDateString()
    release_date:Date
}
