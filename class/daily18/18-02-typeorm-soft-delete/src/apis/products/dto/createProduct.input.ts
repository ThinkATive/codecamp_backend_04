import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator'; // yarn add class-validator

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0) // 최소값 0
  @Field(() => Int)
  price: number;
}
