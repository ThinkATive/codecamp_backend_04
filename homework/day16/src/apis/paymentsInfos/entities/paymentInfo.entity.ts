import { PaymentType } from 'src/apis/paymentsTypes/entities/paymentType.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  price: number;

  @Column()
  cardnumber: string;

  @Column()
  name: string;

  @Column()
  depositaccount: string;

  @Column()
  paidphonenumber: string;

  @Column()
  cardname: string;

  @Column()
  bankname: string;

  @JoinColumn()
  @OneToOne(() => PaymentType)
  paymenttype: PaymentType;
}
