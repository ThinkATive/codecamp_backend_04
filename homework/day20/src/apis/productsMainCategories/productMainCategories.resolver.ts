import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductMainCategory } from './entities/productMainCategory.entity';
import { ProductMainCategoriesService } from './productMainCategories.service';

@Resolver()
export class ProductMainCategoriesResolver {
  constructor(
    private readonly productMainCategoryService: ProductMainCategoriesService,
  ) {}

  @Mutation(() => ProductMainCategory) // () => code-first를 위한 리턴타입
  createProductMainCategory(
    @Args('productMainCategoryName')
    productMainCategoryName: string, //
  ) {
    return this.productMainCategoryService.create({ productMainCategoryName });
  }
}
