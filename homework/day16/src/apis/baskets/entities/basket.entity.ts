import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalprice: number;

  @Column()
  numberofproduct: number;

  @Column()
  brandname: string;
}
