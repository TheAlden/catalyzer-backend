import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
  @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
  @InjectModel(User.name) private readonly userModel: Model<User>,
) {}

  async create(createCatDto: CreateCatDto, userId: string): Promise<Cat> {
    try {
      if (!userId) {throw new Error('userId is required');}
      
      const createdCat = new this.catModel({
        ...createCatDto,
        userId,
      });

      const savedCat = await createdCat.save();

      // Update the user to add the cat ID
      await this.userModel.findByIdAndUpdate(userId, {
        $push: { cats: savedCat._id },
      });

      return savedCat;
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