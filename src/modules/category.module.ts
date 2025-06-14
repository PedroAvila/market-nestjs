import {
  CreateCategoryUseCase,
  GetAllCategoryByCompanyIdUseCase,
  GetByIdCategoryUseCase,
  UpdateCategoryUseCase,
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
    {
      provide: CATEGORY_USECASE_TOKENS.update,
      useClass: UpdateCategoryUseCase,
    },
    {
      provide: CATEGORY_USECASE_TOKENS.getById,
      useClass: GetByIdCategoryUseCase,
    },
  ],
  exports: [
    CATEGORY_USECASE_TOKENS.getAll,
    CATEGORY_USECASE_TOKENS.create,
    CATEGORY_USECASE_TOKENS.update,
    CATEGORY_USECASE_TOKENS.getById,
  ],
})
export class CategoryModule {}
