import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductBasket } from 'src/apis/baskets/entities/productBasket.entity';
import { ProductBrand } from 'src/apis/brands/entities/productBrand.entity';
import { Color } from 'src/apis/colors/entities/color.entity';
import { Gender } from 'src/apis/genders/entities/gender.entity';
import { Material } from 'src/apis/materials/entities/material.entity';
import { Order } from 'src/apis/orders/entities/order.entity';
import { ProductSubCategory } from 'src/apis/productsSubCategories/entities/productSubCategory.entity';
import { ProductSeason } from 'src/apis/seasons/entities/productSeason.entity';
import { Size } from 'src/apis/sizes/entities/size.entity';
import {
  Column,
  DeleteDateColumn,
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
  productName: string;

  @Column()
  @Field(() => Int)
  productPrice: number;

  @Column()
  @Field(() => String)
  productDescription: string;

  @Column()
  @Field(() => String)
  productSerialNumber: string;

  @Column({ default: 0 })
  @Field(() => Int)
  productDiscount: number;

  @Column({ default: 0 })
  @Field(() => Int)
  productPeopleLiked: number;

  @Column()
  @Field(() => Date)
  productManufactureDate: Date;

  @Column({ default: true })
  @Field(() => Boolean)
  isStock: boolean;

  @Column({ default: 0 })
  @Field(() => Boolean)
  productPeopleInterested: boolean;

  @ManyToOne(() => ProductBrand)
  @Field(() => ProductBrand)
  productBrand: ProductBrand;

  @ManyToOne(() => ProductSeason)
  @Field(() => ProductSeason)
  productSeason: ProductSeason;

  @ManyToOne(() => ProductSubCategory)
  @Field(() => ProductSubCategory)
  productSubCategory: ProductSubCategory;

  // @ManyToOne(() => ProductBasket)
  // @Field(() => ProductBasket)
  // basket: ProductBasket;

  @DeleteDateColumn()
  deletedAt: Date;

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
