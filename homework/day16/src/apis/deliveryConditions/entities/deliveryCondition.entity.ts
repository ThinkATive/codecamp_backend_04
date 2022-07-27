import { DeliveryServiceCompany } from 'src/apis/deliveryServicesCompanies/entities/deliveryServiceCompany.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DeliveryCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliverycondition: string;

  @JoinColumn()
  @OneToOne(() => DeliveryServiceCompany)
  deliveryservicecompany: DeliveryServiceCompany;
}
