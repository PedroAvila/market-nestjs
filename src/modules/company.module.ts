import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '../infrastructure/api/company/company.controller';
import { COMPANY_USECASE_TOKENS } from '../infrastructure/tokens';
import { CompanyEntity } from '@infrastructure/persistence';
import { TaxModule } from './tax.module';
import {
  CreateCompanyUseCase,
  GetByIdCompanyUseCase,
  GetCompanyUseCase,
  UpdateCompanyUseCase,
} from '@application/use-case/company';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), TaxModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: COMPANY_USECASE_TOKENS.getAll,
      useClass: GetCompanyUseCase,
    },
    {
      provide: COMPANY_USECASE_TOKENS.create,
      useClass: CreateCompanyUseCase,
    },
    {
      provide: COMPANY_USECASE_TOKENS.update,
      useClass: UpdateCompanyUseCase,
    },
    {
      provide: COMPANY_USECASE_TOKENS.getById,
      useClass: GetByIdCompanyUseCase,
    },
  ],
  exports: [
    COMPANY_USECASE_TOKENS.create,
    COMPANY_USECASE_TOKENS.getAll,
    COMPANY_USECASE_TOKENS.update,
    COMPANY_USECASE_TOKENS.getById,
  ],
})
export class CompanyModule {}
