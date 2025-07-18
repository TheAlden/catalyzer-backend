import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  userId: string;

  @Field()
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Field(() => [ID], { nullable: true })
  @Prop({ type: [Types.ObjectId], ref: 'Cat', default: [] })
  cats: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);