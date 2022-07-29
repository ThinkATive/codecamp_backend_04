import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator'; // yarn add class-validator
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocations/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0) // 최소값 0
  @Field(() => Int)
  price: number;

  //one to one
  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  //
  @Field(() => String)
  productCategoryId: string;
}
