import { Field, ObjectType } from '@nestjs/graphql';
import { ProductBasket } from 'src/apis/baskets/entities/productBasket.entity';
import {
  Column,
  DeleteDateColumn,
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

  @Column({ default: false })
  @Field(() => Boolean)
  isAdmin: boolean;

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
  password: string;

  @Column()
  @Field(() => String)
  residentregistrationnumber: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // @JoinColumn()
  // @OneToOne(() => ProductBasket)
  // @Field(() => ProductBasket)
  // basket: ProductBasket;
}
