import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;

  @ManyToMany(() => Product, (products) => products.genders)
  products: Product[];
}
