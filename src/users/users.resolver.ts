import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { CreateUserInput } from './dto/create-user.dto';
import { Public } from '../auth/pubic.decorator';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserModel])
  async users() {
    return this.usersService.findAll();
  }

  @Public()
  @Mutation(() => UserModel)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }
}