import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SignInDto {
  @Field()
  username: string;

  @Field()
  password: string;
}