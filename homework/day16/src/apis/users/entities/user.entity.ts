import { Basket } from 'src/apis/baskets/entities/basket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isadmin: boolean;

  @Column()
  name: string;

  @Column()
  phonenumber: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  signupdate: string;

  @Column()
  residentregistrationnumber: string;

  @JoinColumn()
  @OneToOne(() => Basket)
  basket: Basket;
}
