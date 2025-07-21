import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './cats.model';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/schemas/user.schema';

@Resolver(() => Cat)
export class CatsResolver {
    constructor(private readonly catsService: CatsService) {}

    @Query(() => [Cat])
    async cats() {
        return this.catsService.findAll();
    }

    @Query(() => [Cat])
    async usersCats(@CurrentUser() user: { userId: string }) {
        const userId = user.userId;
        return this.catsService.findAllByUser(userId);
    }

    @Query(() => Cat)
    async cat(@Args('id') id: string) {
        return this.catsService.findOne(id);
    }

    @Mutation(() => Cat)
    async createCat(
    @Args('createCatDto') input: CreateCatDto, @CurrentUser() user: { userId: string },) {
        const userId = user.userId;
        return this.catsService.create(input, userId);
    }

    @Mutation(() => Cat, { nullable: true })
    deleteCat(@Args('id') id: string, @CurrentUser() user: { userId: string }) {
        return this.catsService.delete(id, user.userId);
    }

    @Mutation(() => Cat, { nullable: true })
    updateCat(@Args('id') id: string, @Args('updateCatDto') input: UpdateCatDto, @CurrentUser() user: { userId: string }) {
        return this.catsService.update(id, input, user.userId);
    }
}