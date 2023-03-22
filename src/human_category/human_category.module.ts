import { Module } from '@nestjs/common';
import { HumanCategoryService } from './human_category.service';
import { HumanCategoryController } from './human_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HumanCategory } from './models/human_category.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([HumanCategory]), JwtModule],
  controllers: [HumanCategoryController],
  providers: [HumanCategoryService]
})
export class HumanCategoryModule {}
