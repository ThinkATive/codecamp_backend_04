import { Field, ObjectType } from '@nestjs/graphql';
import { Basket } from 'src/apis/baskets/entities/basket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Boolean)
  isadmin: boolean;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phonenumber: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  gender: string;

  @Column()
  @Field(() => Date)
  signupdate: Date;

  @Column()
  @Field(() => String)
  residentregistrationnumber: string;

  @JoinColumn()
  @OneToOne(() => Basket)
  @Field(() => Basket)
  basket: Basket;
}
