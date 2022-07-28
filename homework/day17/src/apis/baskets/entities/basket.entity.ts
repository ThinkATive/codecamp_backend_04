import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Basket {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  totalprice: number;

  @Column()
  @Field(() => Int)
  numberofproduct: number;

  @Column()
  @Field(() => String)
  brandname: string;
}
