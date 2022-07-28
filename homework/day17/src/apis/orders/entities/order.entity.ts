import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DeliveryCondition } from 'src/apis/deliveryConditions/entities/deliveryCondition.entity';
import { PaymentInfo } from 'src/apis/paymentsInfos/entities/paymentInfo.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  totalprice: number;

  @Column()
  @Field(() => String)
  receiver: string;

  @Column()
  @Field(() => String)
  receiveadress: string;

  @Column()
  @Field(() => String)
  phonenumber: string;

  @Column()
  @Field(() => String)
  orderdate: string;

  @Column()
  @Field(() => String)
  request: string;

  @Column()
  @Field(() => Int)
  productamount: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => DeliveryCondition)
  @Field(() => DeliveryCondition)
  deliverycondition: DeliveryCondition;

  @JoinColumn()
  @OneToOne(() => PaymentInfo)
  @Field(() => PaymentInfo)
  paymentinfo: PaymentInfo;

  @JoinTable()
  @ManyToMany(() => Product, (products) => products.orders)
  @Field(() => [Product])
  products: Product[];
}
