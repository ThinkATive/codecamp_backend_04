import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductSeason } from './entities/productSeason.entity';
import { ProductSeasonsService } from './productSeasons.service';

@Resolver()
export class ProductSeasonsResolver {
  constructor(private readonly productSeasonService: ProductSeasonsService) {}

  @Mutation(() => ProductSeason) // () => code-first를 위한 리턴타입
  createProductSeason(
    @Args('seasonName')
    seasonName: string, //
  ) {
    return this.productSeasonService.create({ seasonName });
  }
}
