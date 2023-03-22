import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  name: string;
  // email:string
  login: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 'password', description: 'Foydalanuvchi parolie' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi parolie' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  // @ApiProperty({
  //   example: 'admin emaili',
  //   description: 'Admin elektron pochtasi',
  // })
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  //   unique: true,
  // })
  // email: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi parolie' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi parolie' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'false',
    description: 'Foydalanuvchi tasdiqlangan holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'false',
    description: 'adminning tasdiqlanganlik holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({ example: 'token', description: 'Hashlangan token' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
