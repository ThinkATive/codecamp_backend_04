import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSubCategory } from './entities/productSubCategory.entity';

@Injectable()
export class ProductSubCategoriesService {
  constructor(
    @InjectRepository(ProductSubCategory)
    private readonly productSubCategoryRepository: Repository<ProductSubCategory>,
  ) {}
  async create({ createProductSubCategoryInput }) {
    // DB에 카테고리 등록
    const { productMainCategoryId, ...productSubCategory } =
      createProductSubCategoryInput;

    const result = await this.productSubCategoryRepository.save({
      ...productSubCategory,
      productMainCategory: { id: productMainCategoryId },
    });
    console.log(result);
    return result;
  }
}
