import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBrand } from './entities/productBrand.entity';

@Injectable()
export class ProductBrandsService {
  constructor(
    @InjectRepository(ProductBrand)
    private readonly productBrandRepository: Repository<ProductBrand>,
  ) {}
  async create({ brandName }) {
    // DB에 카테고리 등록
    const result = await this.productBrandRepository.save({
      brandName: brandName,
    });
    return result;
  }
}
