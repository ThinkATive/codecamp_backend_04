import { MainCategory } from 'src/apis/productsMainCategories/entities/productMainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subcategory: string;

  @ManyToOne(() => MainCategory)
  maincategory: MainCategory;
}
