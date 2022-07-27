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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  productnumber: string;

  @Column()
  discount: string;

  @Column()
  like: string;

  @Column()
  productiondate: string;

  @Column()
  stock: boolean;

  @Column()
  interested: boolean;

  @ManyToOne(() => Brand)
  brand: Brand;

  @ManyToOne(() => Season)
  season: Season;

  @ManyToOne(() => SubCategory)
  subcategory: SubCategory;

  @ManyToOne(() => Basket)
  basket: Basket;

  @ManyToMany(() => Order, (orders) => orders.products)
  orders: Order[];
  
  @JoinTable()
  @ManyToMany(() => Color, (colors) => colors.products)
  colors: Color[];

  @JoinTable()
  @ManyToMany(() => Size, (sizes) => sizes.products)
  sizes: Size[];

  @JoinTable()
  @ManyToMany(() => Gender, (genders) => genders.products)
  genders: Gender;

  @JoinTable()
  @ManyToMany(() => Material, (materials) => materials.products)
  materials: Material;

}
