import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Venue } from "src/venue/models/venue.model"

interface VenuePhotoAttrs{
    object_id:number
    url:string
}


@Table({tableName:'venue_photo'})
export class VenuePhoto extends Model<VenuePhoto, VenuePhotoAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
        
    })
    id:number

    @ForeignKey(()=>Venue)
    @Column({
        type:DataType.INTEGER,
        
    })
    object_id:number

    @Column({
        type:DataType.STRING,
        
    })
    url:string


}
