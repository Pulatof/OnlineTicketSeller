import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateEventDto {

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
      @IsString()
    photo:string

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
      @IsString()
    info:string
    

    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
    
      @IsNotEmpty()
      @IsNumber()
    event_type_id:number

    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
   
      // @IsNotEmpty()
      @IsNumber()
    human_category_id:number

    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })

      // @IsNotEmpty()
      @IsNumber()
    venue_id:number

    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
  
      // @IsNotEmpty()
      @IsNumber()
    lang_id:number

    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      // @IsNotEmpty()
      @IsDateString()
    release_date:Date
}
