import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from 'src/infrastructure/api/company/company.controller';
import { COMPANY_USECASE_TOKENS } from 'src/infrastructure/tokens';
import { CreateCompanyUseCase } from '../application/use-case/company/create';
import { GetCompanyUseCase } from '../application/use-case/company/get';
import { GetByIdCompanyUseCase } from '../application/use-case/company/single';
import { UpdateCompanyUseCase } from '../application/use-case/company/update';
import { CompanyEntity } from '../infrastructure/persistence/typeorm/entities';
import { TaxModule } from './tax.module';

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
