import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('taxes')
export class TaxEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  percentage: number;

  @Column({
    type: 'timestamp',
    update: false,
  })
  createdAt: Date;

  @OneToMany(() => CompanyEntity, (company) => company.tax)
  companies: CompanyEntity[];
}
