import { Module } from '@nestjs/common';
import { CustomerCartService } from './customer_cart.service';
import { CustomerCartController } from './customer_cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerCart } from './models/customer_cart.model';
import { Cart } from 'src/cart/models/cart.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([CustomerCart, Cart]), JwtModule],
  controllers: [CustomerCartController],
  providers: [CustomerCartService]
})
export class CustomerCartModule {}
