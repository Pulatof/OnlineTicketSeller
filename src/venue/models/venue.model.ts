import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { VenueType } from 'src/venue_type/models/venue_type.model';

interface VenueAttrs {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  venue_type_id: number;
  schema: string;
  region_id: number;
  district: number;
}

@Table({ tableName: 'veune' })
export class Venue extends Model<Venue, VenueAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  site: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ForeignKey(() => VenueType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  venue_type_id: number;

  @Column({
    type: DataType.STRING,
  })
  schema: string;

  @Column({
    type: DataType.INTEGER,

  })
  region_id: number;

  @Column({
    type: DataType.INTEGER,

  })
  district_id: number;

}
