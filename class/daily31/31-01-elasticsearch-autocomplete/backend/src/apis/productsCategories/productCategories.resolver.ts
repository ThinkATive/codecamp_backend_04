import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoriesService } from './productCategories.service';

@Resolver()
export class ProductCategoriesResolver {
  constructor(
    private readonly productCategoryService: ProductCategoriesService,
  ) {}

  @Mutation(() => ProductCategory) // () => code-first를 위한 리턴타입
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoryService.create({ name });
  }
}
