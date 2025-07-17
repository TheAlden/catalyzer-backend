import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(input: CreateUserInput): Promise<User> {
   const existing = await this.userModel.findOne({ username: input.username });
  if (existing) {
    throw new Error('Username is already taken.');
  }
    const newUser = new this.userModel({ username: input.username, password: input.password });
    return newUser.save();
  }
}