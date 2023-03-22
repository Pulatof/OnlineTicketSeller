import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Customer } from "src/customer/models/customer.model"
import { Ticket } from "src/ticket/models/ticket.model"

interface CartAttrs{
    ticked_id:number
    customer_id:number
    createdAt:Date
    finishedAt:Date
    status_id:number
}

@Table({tableName:'cart'})
export class Cart extends Model<Cart, CartAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number

    @ForeignKey(()=>Ticket)
    @Column({
        type:DataType.INTEGER
    })
    ticket_id:number

    @ForeignKey(()=>Customer)
    @Column({
        type:DataType.INTEGER
    })
    customer_id:number

    @Column({
        type:DataType.DATE,
        defaultValue:Date.now()
    })
    createdAt?: Date

    // @ForeignKey(()=>Status )
    @Column({
        type:DataType.INTEGER,

    })
    status_id:number
}
