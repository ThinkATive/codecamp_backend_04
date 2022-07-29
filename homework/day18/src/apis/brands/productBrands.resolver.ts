import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductBrand } from './entities/productBrand.entity';
import { ProductBrandsService } from './productBrands.service';

@Resolver()
export class ProductBrandsResolver {
  constructor(private readonly productBrandService: ProductBrandsService) {}

  @Mutation(() => ProductBrand) // () => code-first를 위한 리턴타입
  createProductBrand(
    @Args('brandName') brandName: string, //
  ) {
    return this.productBrandService.create({ brandName });
  }
}
