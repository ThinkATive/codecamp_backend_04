import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductSubCategoryInput } from './dto/createProductSubCategory.input';
import { ProductSubCategory } from './entities/productSubCategory.entity';
import { ProductSubCategoriesService } from './productSubCategories.service';

@Resolver()
export class ProductSubCategoriesResolver {
  constructor(
    private readonly productSubCategoryService: ProductSubCategoriesService,
  ) {}

  @Mutation(() => ProductSubCategory) // () => code-first를 위한 리턴타입
  createProductSubCategory(
    @Args('createProductSubCategoryInput')
    createProductSubCategoryInput: CreateProductSubCategoryInput, //
  ) {
    return this.productSubCategoryService.create({
      createProductSubCategoryInput,
    });
  }
}
