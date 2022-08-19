import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productService: ProductsService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string,
  ) {
    // 엘라스틱 서치에서 조회하기 연습(연습 이후에는 다시 삭제하기)
    const result = await this.elasticsearchService.search({
      index: 'myproduct0444',
      query: {
        //match: { age: 17 },
        bool: {
          should: [{ prefix: { name: search } }],
        },
      },
    });
    console.log(JSON.stringify(result, null, '  '));
    // 엘라스틱 서치에서 조회 해보기 위해 임시로 주석
    // return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product) // () => code-first를 위한 리턴타입
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    // // 엘라스틱 서치에 등록하기 연습(연습 이후에는 다시 삭제하기)
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct04',
    //   document: {
    //     name: '철수',
    //     age: 13,
    //     school: '다람쥐초등학교',
    //     ...createProductInput,
    //   },
    // });
    // 몽고디비처럼 넣는대로 아무거나 다 들어감.

    //
    // 엘라스틱 서치에 등록해보기 위해 임시로 주석
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    //판매완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });

    //수정하기
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
