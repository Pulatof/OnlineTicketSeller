import { Column, DataType } from "sequelize-typescript";

export class CreateVenueTypeDto {
    @Column({
        type:DataType.STRING,
      })
      name: string;
}
