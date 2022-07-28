import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaymentType } from 'src/apis/paymentsTypes/entities/paymentType.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class PaymentInfo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Date)
  date: Date;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  cardnumber: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  depositaccount: string;

  @Column()
  @Field(() => String)
  paidphonenumber: string;

  @Column()
  @Field(() => String)
  cardname: string;

  @Column()
  @Field(() => String)
  bankname: string;

  @JoinColumn()
  @OneToOne(() => PaymentType)
  @Field(() => PaymentType)
  paymenttype: PaymentType;
}
