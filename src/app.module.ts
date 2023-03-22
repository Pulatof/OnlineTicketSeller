import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/models/customer.model';
import { TicketModule } from './ticket/ticket.module';
import { CartModule } from './cart/cart.module';
import { SeatModule } from './seat/seat.module';
import { EventModule } from './event/event.module';
import { EventTypeModule } from './event_type/event_type.module';
import { VenueModule } from './venue/venue.module';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { VenueTypeModule } from './venue_type/venue_type.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { BookingModule } from './booking/booking.module';
import { LangModule } from './lang/lang.module';
import { CustomerCartModule } from './customer_cart/customer_cart.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';
import { Booking } from './booking/models/booking.model';
import { Cart } from './cart/models/cart.model';
import { CustomerAddress } from './customer_address/models/customer_address.model';
import { CustomerCart } from './customer_cart/models/customer_cart.model';
import { Event } from './event/models/event.model';
import { EventType } from './event_type/models/event_type.model';
import { HumanCategory } from './human_category/models/human_category.model';
import { Lang } from './lang/models/lang.model';
import { Seat } from './seat/models/seat.model';
import { SeatType } from './seat_type/models/seat_type.models';
import { Ticket } from './ticket/models/ticket.model';
import { Venue } from './venue/models/venue.model';
import { VenuePhoto } from './venue_photo/models/venue_photo.model';
import { VenueType } from './venue_type/models/venue_type.model';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Customer,
        Booking,
        Cart,
        CustomerAddress,
        CustomerCart,
        Event,
        EventType,
        HumanCategory,
        Lang,
        Seat,
        SeatType,
        Ticket,
        Venue,
        VenuePhoto,
        VenueType,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    CustomerModule,
    TicketModule,
    CartModule,
    SeatModule,
    EventModule,
    EventTypeModule,
    VenueModule,
    SeatTypeModule,
    VenueTypeModule,
    HumanCategoryModule,
    BookingModule,
    LangModule,
    CustomerCartModule,
    CustomerAddressModule,
    VenuePhotoModule,
    AdminModule,
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
