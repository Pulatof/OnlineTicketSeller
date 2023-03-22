import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { HumanCategory } from './models/human_category.model';

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory)
    private readonly human_categoryRepo:typeof HumanCategory
  ){}
  async create(createHumanCategoryDto: CreateHumanCategoryDto) {
   const human_category = await this.human_categoryRepo.create(createHumanCategoryDto)
   return human_category
  }

  findAll() {
    return this.human_categoryRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const human_category = await this.human_categoryRepo.findOne({where:{id}})
    if (!human_category){
      throw new BadRequestException('human_category not found')
    }
    return human_category
  }

  async update(id: number, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    const human_category =  await this.human_categoryRepo.findOne({where:{id}})
    if (!human_category){
      throw new BadRequestException('human_category not found')

    }
    const updatedhuman_category = await this.human_categoryRepo.update(
      {...updateHumanCategoryDto},
      {where:{id}, returning:true})
      const response = {
        message:'human_category updated succesfully',
        human_category : updatedhuman_category[1][0]
      }
      return response
  }

  async remove(id: number) {
    const human_category = await this.human_categoryRepo.findOne({ where: { id: id } });
    if (!human_category) {
      throw new BadRequestException('event not found');
    }
    await this.human_categoryRepo.destroy({ where: { id } });
    const response = {
      message: 'human_category deleted succesfully',
      HumanCategoryID: id,
    };
    return response;
  }
}
