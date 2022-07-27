import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StarbucksMenuInput } from './dto/starbucksMenu.input';
import { Starbucks } from './entities/starbucks.entity';
import { StarbucksService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}

  @Mutation(() => String)
  createStarbucks(
    @Args('starbucksMenuInput') starbucksMenuInput: StarbucksMenuInput,
  ) {
    return this.starbucksService.createMenu({ starbucksMenuInput });
  }

  @Query(() => [Starbucks])
  fetchStarbucks() {
    return this.starbucksService.findAll();
  }
}
