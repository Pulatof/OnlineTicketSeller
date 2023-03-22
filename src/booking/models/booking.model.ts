import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Cart } from "src/cart/models/cart.model"

interface BookingAttrs{
    cart_id:number
    createdAt:Date
    finished:Date
    payment_method_id:number
    delivery_method_id:number
    discount_coupon_id:BigInt
    status_id:number
    
}

@Table({tableName:'booking'})
export class Booking extends Model<Booking, BookingAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number


    // @ForeignKey(()=>Cart)
    @Column({
        type:DataType.INTEGER,
        
    })
    cart_id:number


    @Column({
        type:DataType.DATE,
        
    })
    createdAt: Date

    @Column({
        type:DataType.DATE,
        
    })
    finished: Date

    @Column({
        type:DataType.DATE,
        
    })
    payment_method_id:number


    @Column({
        type:DataType.DATE,
        
    })
    delivery_method_id:number

    @Column({
        type:DataType.BIGINT,
        
    })
    discount_coupon_id:bigint


    @Column({
        type:DataType.INTEGER,
        
    })
    status_id:number

   



    




}
