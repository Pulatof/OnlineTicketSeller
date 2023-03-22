import { ApiProperty } from "@nestjs/swagger"
import { STRING } from "sequelize"
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"

interface CustomerAttrs{
    first_name:string
    last_name:string
    phone:string
    hashed_password:string
    email:string
    birth_day:Date
    lang_id:number
    hashed_refresh_token:string
    is_active:boolean

}

@Table({tableName:'customer'})
export class Customer extends Model<Customer, CustomerAttrs>{
    @Column({
    type:DataType.INTEGER,
    autoIncrement:true,
    primaryKey:true
    })
    id:number

    @ApiProperty({example:'user ismi', description:'Foydalanuvchi ismi & Firstname of user'})
    @Column({
        type:DataType.STRING
    })
    first_name:string

    @ApiProperty({example:'user familiasi', description:'Foydalanuvchi familiasi & Lastname of user'})
    @Column({
        type:DataType.STRING
    })
    last_name:string
    
    @ApiProperty({example:'901234567', description:'Foydalanuvchi telefoni'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    phone:string

    @ApiProperty({example:'password', description:'Foydalanuvchi parolie'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    hashed_password:string

    @ApiProperty({example:'email', description:'Foydalanuvchi e-pochtasi'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    email:string

    @ApiProperty({example:'01.01.2000', description:'Foydalanuvchi tugilgan sanasii'})
    @Column({
        type:DataType.DATE,
    })
    birth_day:Date


    @ApiProperty({example:'til', description:'Tilni tanlash'})
    @ForeignKey(()=>Customer)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    lang_id:number

    @ApiProperty({example:'token', description:'Tasdiqlangan holati'})
    @Column({
        type:DataType.STRING,
        defaultValue:false
    })
    hashed_refresh_token:string
    
    @Column({
        type:DataType.BOOLEAN,
        
    })
    is_active:boolean
}
