import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSeason } from './entities/productSeason.entity';
import { ProductSeasonsResolver } from './productSeasons.resolver';
import { ProductSeasonsService } from './productSeasons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductSeason, //
    ]),
  ],
  providers: [
    ProductSeasonsResolver, //
    ProductSeasonsService,
  ],
})
export class ProductSeasonsModule {}
