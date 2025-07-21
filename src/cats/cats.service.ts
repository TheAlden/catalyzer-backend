import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import { User } from '../users/schemas/user.schema';
import { Model, Types } from 'mongoose';
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

  async findAllByUser(userId: string): Promise<Cat[]> {
    return this.catModel.find({ userId }).exec();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat | null> {
    return this.catModel.findById(id).exec();
  }

  async delete(id: string, userId: string): Promise<any> {
    const isOwner = await this.verifyOwnership(id, userId);

    if (!isOwner) return false;

    // Remove the cat document
    const deletedCat = await this.catModel.findByIdAndDelete(id);

    // Remove the ObjectId from the user's cats array
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { cats: new Types.ObjectId(id) }
    });

  return deletedCat;
  }

  async update(id: string, updateData: UpdateCatDto, userId: string): Promise<Cat> {
    const isOwner = await this.verifyOwnership(id, userId);

    if (isOwner) {
      return this.catModel.findByIdAndUpdate(id, updateData, { new: true });
    }
  }

  // Helper function to detect ownership of cat:
  async verifyOwnership(catId: string, userId: string): Promise<boolean> {
    const cat = await this.catModel.findById(catId);

    if (!cat || !cat.userId) {
      throw new Error('Cat not found');
    }

    if (cat.userId.toString() !== userId) {
      throw new Error('You do not have permission to modify this cat');
    }

    return true;
  }
}