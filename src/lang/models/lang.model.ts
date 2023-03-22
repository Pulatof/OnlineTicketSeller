import { Column, DataType, Model, Table } from "sequelize-typescript"

interface LangAttrs{
    uzb_lang_id:number
    rus_lang_id:number
}


@Table({tableName:'lang'})
export class Lang extends Model<Lang, LangAttrs>{
    
        @Column({
            type:DataType.INTEGER,
            autoIncrement:true,
            primaryKey:true
        })
        id:number

        @Column({
            type:DataType.INTEGER,
           
        })
        uzb_lang_id:number

        @Column({
            type:DataType.INTEGER,
           
        })
        rus_lang_id:number
    
}
