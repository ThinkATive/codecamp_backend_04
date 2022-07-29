import { PaymentInfo } from 'src/apis/paymentsInfos/entities/paymentInfo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentCancellation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;
  @Column()
  price: number;
  @Column()
  idaccepted: boolean;

  @JoinColumn()
  @OneToOne(() => PaymentInfo)
  paymentinfo: PaymentInfo;
}
