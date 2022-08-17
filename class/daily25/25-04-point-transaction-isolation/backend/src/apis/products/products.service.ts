import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // const result = await this.productRepository.save({
    //   ...createProductInput,

    //   // 하나하나 저장방법
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    //   // isSoldout: false // default 값
    // });

    // 2. 상품과 상품거래 위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    // productTags // ["#전자제품", "#영등포", "#컴퓨터"]
    const result2 = []; // [{ name: ..., id: ...}, ...]
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productTagRepository.findOne({
        where: { name: tagname },
      });

      if (prevTag) {
        // 기존에 태그가 존재한다면
        result2.push(prevTag);
      } else {
        // 기존에 태그가 없었다면
        const newTag = await this.productTagRepository.save({
          name: tagname,
        });
        result2.push(newTag);
      }
    }

    const result3 = await this.productRepository.save({
      ...product,
      productSaleslocation: result,
      productCategory: { id: productCategoryId },
      productTags: result2,
    });

    return result3;
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

  async delete({ productId }) {
    // // 1. 실제 삭제!
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // // 2. 소프트 삭제(직접구현) - isDeleted 사용
    // this.productRepository.update(
    //   { id: productId }, //
    //   { isDelete: true },
    // );

    // // 3. 소프트 삭제(직접구현) - deletedAt
    // this.productRepository.update(
    //   { id: productId }, //
    //   { deletedAt: new Date() },
    // );

    // // 4. 소프트 삭제(typeORM 제공) - softRemove ( 아이디로만 삭제 가능 )
    // this.productRepository.softRemove({ id: productId });

    // 5. 소프트 삭제(typeORM 제공) - softDelete ( 다른 요소로도 삭제 가능 )
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
