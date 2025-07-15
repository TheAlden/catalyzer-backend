// Used for GraphQL

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './cats.model';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Resolver(() => Cat)
export class CatsResolver {
    constructor(private readonly catsService: CatsService) {}

    @Query(() => [Cat])
    async cats() {
        return this.catsService.findAll();
    }

    @Query(() => Cat)
    async cat(@Args('id') id: string) {
        return this.catsService.findOne(id);
    }

    @Mutation(() => Cat)
    async createCat(@Args('createCatDto') input: CreateCatDto) {
        return this.catsService.create(input);
    }

    @Mutation(() => Cat, { nullable: true })
    deleteCat(@Args('id') id: string) {
        return this.catsService.delete(id);
    }

    @Mutation(() => Cat, { nullable: true })
    updateCat(
    @Args('id') id: string,
    @Args('updateCatDto') input: UpdateCatDto
    ) {
        return this.catsService.update(id, input);
    }
}