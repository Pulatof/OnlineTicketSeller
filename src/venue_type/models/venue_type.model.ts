import { Column, DataType, Model, Table } from "sequelize-typescript";

interface VenueTypeAttrs{
    name:string
}

@Table({tableName:'venue_type'})
export class VenueType extends Model<VenueType, VenueTypeAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    name:string

}
