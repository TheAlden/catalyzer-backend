import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  color: string;
}