import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Basket } from 'src/apis/baskets/entities/basket.entity';
import { Brand } from 'src/apis/brands/entities/brand.entity';
import { Color } from 'src/apis/colors/entities/color.entity';
import { Gender } from 'src/apis/genders/entities/gender.entity';
import { Material } from 'src/apis/materials/entities/material.entity';
import { Order } from 'src/apis/orders/entities/order.entity';
import { SubCategory } from 'src/apis/productsSubCategories/entities/productSubCategory.entity';
import { Season } from 'src/apis/seasons/entities/season.entity';
import { Size } from 'src/apis/sizes/entities/size.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  productnumber: string;

  @Column({ default: 0 })
  @Field(() => Int)
  discount: number;

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @Column()
  @Field(() => Date)
  productiondate: Date;

  @Column({ default: true })
  @Field(() => Boolean)
  stock: boolean;

  @Column({ default: 0 })
  @Field(() => Boolean)
  interested: boolean;

  @ManyToOne(() => Brand)
  @Field(() => Brand)
  brand: Brand;

  @ManyToOne(() => Season)
  @Field(() => Season)
  season: Season;

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  subcategory: SubCategory;

  @ManyToOne(() => Basket)
  @Field(() => Basket)
  basket: Basket;

  @ManyToMany(() => Order, (orders) => orders.products)
  @Field(() => [Order])
  orders: Order[];

  @JoinTable()
  @ManyToMany(() => Color, (colors) => colors.products)
  @Field(() => [Color])
  colors: Color[];

  @JoinTable()
  @ManyToMany(() => Size, (sizes) => sizes.products)
  @Field(() => [Size])
  sizes: Size[];

  @JoinTable()
  @ManyToMany(() => Gender, (genders) => genders.products)
  @Field(() => [Gender])
  genders: Gender[];

  @JoinTable()
  @ManyToMany(() => Material, (materials) => materials.products)
  @Field(() => [Material])
  materials: Material[];
}
