import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Min(0)
  @Field(() => Int)
  productPrice: number;

  @Field(() => String)
  productDescription: string;

  @Field(() => String)
  productSerialNumber: string;

  @Field(() => Int)
  productDiscount: number;

  @Field(() => Date)
  productManufactureDate: Date;

  @Field(() => String)
  productBrandId: string;

  @Field(() => String)
  productSeasonId: string;

  @Field(() => String)
  productSubCategoryId: string;

  @Field(() => [String])
  productMaterials: string[];

  @Field(() => [String])
  productColors: string[];

  @Field(() => [String])
  productSizes: string[];

  @Field(() => [String])
  productGenders: string[];
}
