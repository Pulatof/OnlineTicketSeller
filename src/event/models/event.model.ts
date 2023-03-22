

import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { EventType } from "src/event_type/models/event_type.model"
import { HumanCategory } from "src/human_category/models/human_category.model"
import { Lang } from "src/lang/models/lang.model"
import { Venue } from "src/venue/models/venue.model"

interface EventAttrs{
    name:string
    photo:string
    start_date:Date
    start_time:string
    finish_date:Date
    finish_time:string
    info:string
    event_type_id:number
    human_category_id:number
    venue_id:number
    lang_id:number
    release_date:Date
}

@Table({tableName:'event'})
export class Event extends Model<Event, EventAttrs>{
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
        type:DataType.STRING
    })
    photo:string

    @Column({
        type:DataType.DATE,
        defaultValue:Date.now()
    })
    start_date:Date

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    start_time:string

    @Column({
        type:DataType.DATE,
        defaultValue:Date.now()
    })
    finish_date:Date



    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    finish_time:string

    @Column({
        type:DataType.INTEGER
    })
    info:string

    @ForeignKey(()=>EventType)
    @Column({
        type:DataType.INTEGER
    })
    event_type_id:number

    @ForeignKey(()=>HumanCategory)
    @Column({
        type:DataType.INTEGER
    })
    human_category_id:number

    @ForeignKey(()=>Venue)
    venue_id:number

    @ForeignKey(()=>Lang)
    @Column({
        type:DataType.INTEGER
    })
    lang_id:number

 
    @Column({
        type:DataType.DATE,
        defaultValue:Date.now()
    })
    release_date:Date



}
