import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CompanyEntity, (company) => company.categories)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;

  @Column({ name: 'companyId' })
  companyId: string;

  @Column()
  code: number;

  @Column()
  name: string;
}
