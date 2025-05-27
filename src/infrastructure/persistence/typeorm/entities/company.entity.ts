import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaxEntity } from './tax.entity';
import { StatusCompany } from '../../../../domain/enums';

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TaxEntity)
  @JoinColumn({ name: 'taxId' })
  tax: TaxEntity;

  @Column({ name: 'taxId' })
  taxId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'char', length: 10 })
  phone: string;

  @Column({ type: 'char', length: 11 })
  ruc: string;

  @Column()
  manager: string;

  @Column({
    type: 'timestamp',
    update: false,
  })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: StatusCompany,
    default: StatusCompany.ENABLED,
  })
  status: StatusCompany;
}
