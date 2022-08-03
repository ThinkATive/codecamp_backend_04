import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrand } from './entities/productBrand.entity';
import { ProductBrandsResolver } from './productBrands.resolver';
import { ProductBrandsService } from './productBrands.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductBrand, //
    ]),
  ],
  providers: [
    ProductBrandsResolver, //
    ProductBrandsService,
  ],
})
export class ProductBrandsModule {}
