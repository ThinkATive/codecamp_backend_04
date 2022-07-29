import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: ['productSubCategory', 'productBrand', 'productSeason'],
    });
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSubCategory', 'productBrand', 'productSeason'],
    });
  }

  findAllWithDeleted() {
    return this.productsRepository.find({
      withDeleted: true,
      relations: ['productSubCategory', 'productBrand', 'productSeason'],
    });
  }

  async create({ createProductInput }) {
    const {
      productBrandId,
      productSeasonId,
      productSubCategoryId,
      ...product
    } = createProductInput;

    const result = await this.productsRepository.save({
      ...product,
      productBrand: { id: productBrandId },
      productSeason: { id: productSeasonId },
      productSubCategory: { id: productSubCategoryId },
    });

    return result;
  }

  async checkStock({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product.isStock)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async update({ productId, updateProductInput }) {
    const currentProduct = await this.productsRepository.findOne({
      where: { id: productId },
    });

    return this.productsRepository.save({
      ...currentProduct,
      id: productId,
      ...updateProductInput,
    });
  }

  async delete({ productId }) {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const isRestored = await this.productsRepository.restore({ id: productId });
    return isRestored.affected ? true : false;
  }
}
