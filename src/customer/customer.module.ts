import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({imports:[SequelizeModule.forFeature([Customer]), JwtModule.register({}), MailerModule, JwtModule],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
