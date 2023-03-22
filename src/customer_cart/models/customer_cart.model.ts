import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Customer } from "src/customer/models/customer.model"

interface CustomerCartAttrs{
    customer_id:number
    name:string
    phone:string
    number:number
    year:string
    month:string
    is_active:boolean
    is_main:boolean

}

@Table({tableName:'customer_cart'})
export class CustomerCart extends Model<CustomerCart, CustomerCartAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number

    @ForeignKey(()=>Customer)
    @Column({
        type:DataType.INTEGER,
        
    })
    customer_id:number

    
    @Column({
        type:DataType.STRING,
       
    })
    name:string

    @Column({
        type:DataType.STRING,
        
    })
    phone:string

    @Column({
        type:DataType.INTEGER,
        
    })
    number:number


    @Column({
        type:DataType.STRING,
        
    })
    year:string

    @Column({
        type:DataType.STRING,
        
    })
    month:string

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
        
    })
    is_active:boolean

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
        
    })
    is_main:boolean

    
}
