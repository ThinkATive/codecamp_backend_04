import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Size {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  size: string;

  @ManyToMany(() => Product, (products) => products.sizes)
  @Field(() => [Product])
  products: Product[];
}
