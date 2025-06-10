import {
  CreateCategoryUseCase,
  GetAllCategoryByCompanyIdUseCase,
} from '@application/use-case/category';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from 'infrastructure/api/category/category.controller';
import { CategoryEntity, CompanyEntity } from '@infrastructure/persistence';
import { CATEGORY_USECASE_TOKENS } from '../infrastructure/tokens';
import { CodeGeneratorModule } from './code-generator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, CompanyEntity]),
    CodeGeneratorModule,
  ],
  controllers: [CategoryController],
  providers: [
    {
      provide: CATEGORY_USECASE_TOKENS.getAll,
      useClass: GetAllCategoryByCompanyIdUseCase,
    },
    {
      provide: CATEGORY_USECASE_TOKENS.create,
      useClass: CreateCategoryUseCase,
    },
  ],
  exports: [CATEGORY_USECASE_TOKENS.getAll, CATEGORY_USECASE_TOKENS.create],
})
export class CategoryModule {}
