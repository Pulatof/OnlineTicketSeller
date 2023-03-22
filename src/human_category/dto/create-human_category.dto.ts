import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateHumanCategoryDto {
    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsString()
    name:string

    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsNotEmpty()
      @IsNumber()
    start_age:number


    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsNotEmpty()
      @IsNumber()
    finish_age:number

    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsNotEmpty()
      @IsNumber()
    gender:number
}
