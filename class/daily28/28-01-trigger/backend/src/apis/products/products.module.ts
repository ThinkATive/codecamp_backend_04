import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductsSubscriber } from './entities/product.subscriber';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSubscriber,
  ],
})
export class ProductsModule {}
