import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phonenumber: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  residentregistrationnumber: string;
}
