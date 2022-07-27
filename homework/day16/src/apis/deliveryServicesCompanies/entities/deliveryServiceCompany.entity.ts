import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeliveryServiceCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryservicecompany: string;
}
