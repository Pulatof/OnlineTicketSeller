import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSeatTypeDto {
    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsString()
    name:string
}
