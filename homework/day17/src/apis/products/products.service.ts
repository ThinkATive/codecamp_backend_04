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
    return this.productsRepository.find();
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    return await this.productsRepository.save({ ...createProductInput });
  }

  async checkStock({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product.stock)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async update({ productId, updateProductInput }) {
    const nowproduct = await this.productsRepository.findOne({
      where: { id: productId },
    });

    return this.productsRepository.save({
      ...nowproduct,
      id: productId,
      ...updateProductInput,
    });
  }
}
