import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from '../colors/entities/color.entity';
import { ProductGender } from '../genders/entities/gender.entity';
import { ProductMaterial } from '../materials/entities/material.entity';
import { ProductSize } from '../sizes/entities/size.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductMaterial,
      ProductSize,
      ProductGender,
      ProductColor,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
  ],
})
export class ProductsModule {}
