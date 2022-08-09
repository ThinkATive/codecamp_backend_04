import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  date: string;
}
