import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryEntity,
  CompanyEntity,
} from '../infrastructure/persistence/typeorm/entities';
import { CategoryController } from 'src/infrastructure/api/category/category.controller';
import { CATEGORY_USECASE_TOKENS } from 'src/infrastructure/tokens';
import { CreateCategoryUseCase } from 'src/application/use-case/category/create';
import { CodeGeneratorModule } from './code-generator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, CompanyEntity]),
    CodeGeneratorModule,
  ],
  controllers: [CategoryController],
  providers: [
    {
      provide: CATEGORY_USECASE_TOKENS.create,
      useClass: CreateCategoryUseCase,
    },
  ],
  exports: [CATEGORY_USECASE_TOKENS.create],
})
export class CategoryModule {}
