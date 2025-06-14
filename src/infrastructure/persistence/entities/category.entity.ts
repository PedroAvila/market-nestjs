import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { SubCategoryEntity } from './sub-category.entity';

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

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subCategories: SubCategoryEntity[];
}
