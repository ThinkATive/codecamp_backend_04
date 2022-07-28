import { Field, ObjectType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/productsMainCategories/entities/productMainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  subcategory: string;

  @ManyToOne(() => MainCategory)
  @Field(() => MainCategory)
  maincategory: MainCategory;
}
