import { Column, DataType, Model, Table } from "sequelize-typescript"

interface HumanCategoryAttrs{
    name:string
    start_age:number
    finish_age:number
    gender:number
}

@Table({tableName:'human_category'})
export class HumanCategory extends Model<HumanCategory, HumanCategoryAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number

    @Column({
        type:DataType.INTEGER,
        
    })
    name:string

    @Column({
        type:DataType.INTEGER,
        
    })
    start_age:number

    @Column({
        type:DataType.INTEGER,
        
    })
    finish_age:number

    @Column({
        type:DataType.INTEGER,
        
    })
    gender:number
    
}
