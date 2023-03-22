import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SeatTypeAttrs{
    name:string
}

@Table({tableName:'seat_type'})
export class SeatType extends Model<SeatType, SeatTypeAttrs>{
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
