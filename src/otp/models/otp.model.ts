import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface OtpAttrs {
    id:string
  phone: string;
  check: string;
  expiration_time:Date
  otp:string
  verify:boolean
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttrs> {
  @ApiProperty({ example: '1c321-z4x5c-z65c6', description: 'OTP ID' })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  check: string;

  @ApiProperty({example:'1978', description:'OTP'})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    otp:string

  @ApiProperty({example:'1978-02-17T08', description:'expiration'})
    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    expiration_time:Date


    @ApiProperty({example:'1978-02-17T08', description:'expiration'})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    verify:string
}
