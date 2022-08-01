import { Product } from 'src/apis/products/entities/product.entity';
import { Review } from 'src/apis/reviews/entities/review.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imgurl: string;

  @Column()
  ismain: boolean;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Review)
  review: Review;
}
