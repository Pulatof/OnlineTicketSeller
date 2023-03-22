import { Column, DataType, Model, Table } from "sequelize-typescript"

interface Event_typeAttrs{
    name:string
    parent_event_type_id:number
}


@Table({tableName:'event_type'})
export class EventType extends Model<EventType, Event_typeAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number


    @Column({
        type:DataType.STRING
    })
    name:string


    @Column({
        type:DataType.INTEGER,
        
    })
    parent_event_type_id:number
}
