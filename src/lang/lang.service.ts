import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { Lang } from './models/lang.model';

@Injectable()
export class LangService {
  constructor(
    @InjectModel(Lang) private readonly langRepo:typeof Lang
  ){}
  async create(createLangDto: CreateLangDto) {
    const lang = await this.langRepo.create(createLangDto)
    return lang
  }

  findAll() {
    return this.langRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const lang = await this.langRepo.findOne({where:{id}})
    if (!lang){
      throw new BadRequestException('lang not found')
    }
    return lang
  }

  async update(id: number, updateLangDto: UpdateLangDto) {
    const lang =  await this.langRepo.findOne({where:{id}})
    if (!lang){
      throw new BadRequestException('lang not found')

    }
    const updatedlang = await this.langRepo.update(
      {...updateLangDto},
      {where:{id}, returning:true})
      const response = {
        message:'lang updated succesfully',
        lang : updatedlang[1][0]
      }
      return response
  }

  async remove(id: number) {
    const lang = await this.langRepo.findOne({ where: { id: id } });
    if (!lang) {
      throw new BadRequestException('lang not found');
    }
    await this.langRepo.destroy({ where: { id } });
    const response = {
      message: 'lang deleted succesfully',
      LangID: id,
    };
    return response;
  }
}
