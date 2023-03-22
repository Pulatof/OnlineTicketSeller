import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Cart]), JwtModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
