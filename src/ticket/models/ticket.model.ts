import { ConflictException } from "@nestjs/common"
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Event } from "src/event/models/event.model"
import { Seat } from "src/seat/models/seat.model"


interface TicketAttrs{
    event_id:number
    seat_id:number
    price:number
    service_fee:number
    status:number
    ticket_type:number
}



@Table({tableName:'ticket'})
export class Ticket extends Model<Ticket, TicketAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number


    @ForeignKey(()=>Event)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    event_id:number

    @ForeignKey(()=>Seat)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    seat_id:number

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    price:number

    @Column({
        type:DataType.INTEGER,
    })
    service_fee:number

    @Column({
        type:DataType.INTEGER
    })
    status:number

    @Column({
        type:DataType.INTEGER
    })
    ticket_type:number

    
}
