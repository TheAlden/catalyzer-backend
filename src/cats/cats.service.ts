import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    try {
      const createdCat = new this.catModel(createCatDto);
      return await createdCat.save();
    } catch (error) {
      console.error('Failed to save cat:', error);
      throw error;
    }
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat | null> {
  return this.catModel.findById(id).exec();
}

  async delete(id: string): Promise<any> {
    return this.catModel.findByIdAndDelete(id);
  }

  async update(id: string, updateData: UpdateCatDto): Promise<Cat> {
    return this.catModel.findByIdAndUpdate(id, updateData, { new: true });
  }
}