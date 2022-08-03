import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductMainCategory } from './entities/productMainCategory.entity';

@Injectable()
export class ProductMainCategoriesService {
  constructor(
    @InjectRepository(ProductMainCategory)
    private readonly productMainCategoryRepository: Repository<ProductMainCategory>,
  ) {}
  async create({ productMainCategoryName }) {
    // DB에 카테고리 등록
    const result = await this.productMainCategoryRepository.save({
      productMainCategoryName: productMainCategoryName,
    });
    return result;
  }
}
