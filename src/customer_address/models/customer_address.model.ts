import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Customer } from "src/customer/models/customer.model"

interface CustomerAddressAttrs{
    customer_id:number
    name:string
    country_id:number
    region_id:number
    district_id:number
    street:string
    house:string
    flat:number
    location:string
    post_index:string
    info:string
}

@Table({tableName:'customer_address'})
export class CustomerAddress extends Model<CustomerAddress, CustomerAddressAttrs>{
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
        type:DataType.INTEGER,
        
    })
    country_id:number

    @Column({
        type:DataType.INTEGER,
        
    })
    region_id:number


    @Column({
        type:DataType.INTEGER,
        
    })
    district_id:number

    @Column({
        type:DataType.STRING,
        
    })
    street:string

    @Column({
        type:DataType.STRING,
        
    })
    house:string

    @Column({
        type:DataType.INTEGER,
        
    })
    flat:number

    @Column({
        type:DataType.STRING,
        
    })
    location:string

    @Column({
        type:DataType.STRING,
        
    })
    post_index:string

    @Column({
        type:DataType.STRING,
        
    })
    info:string

}
