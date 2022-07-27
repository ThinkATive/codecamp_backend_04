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
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalprice: number;

  @Column()
  receiver: string;

  @Column()
  receiveadress: string;

  @Column()
  phonenumber: string;

  @Column()
  orderdate: string;

  @Column()
  request: string;

  @Column()
  productamount: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => DeliveryCondition)
  deliverycondition: DeliveryCondition;

  @JoinColumn()
  @OneToOne(() => PaymentInfo)
  paymentinfo: PaymentInfo;

  @JoinTable()
  @ManyToMany(() => Product, (products) => products.orders)
  products: Product[];
}
