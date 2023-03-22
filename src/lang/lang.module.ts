import { Module } from '@nestjs/common';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lang } from './models/lang.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Lang]), JwtModule],
  controllers: [LangController],
  providers: [LangService]
})
export class LangModule {}
