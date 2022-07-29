import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    this.productRepository.find();
  }

  findOne({ productId }) {
    this.productRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      ...createProductInput,

      // 하나하나 저장방법
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
      // isSoldout: false // default 값
    });
    return result;
  }

  async update({ productId, updateProductInput }) {
    // 수정할 때만 사용! 리턴 값 없음
    // this.productRepository.update(
    //   { id: productId }, // 조건
    //   {
    //     ...updateProductInput,

    //     // name: updateProductInput.name,
    //     // description: updateProductInput.description,
    //     // price: updateProductInput.price
    //   }, // 바꿀내용
    // );

    // 수정 후 결과값까지 받을 때 사용
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = this.productRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async checkSoldout({ productId }) {
    // try {
    //   const product = await this.productRepository.findOne({
    //     where: { id: productId },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
