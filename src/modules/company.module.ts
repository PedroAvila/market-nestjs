import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../infrastructure/persistence/typeorm/entities';
import { CompanyController } from 'src/infrastructure/api/company/company.controller';
import { CreateCompanyUseCase } from '../application/use-case/company/create';
import { COMPANY_USECASE_TOKENS } from 'src/infrastructure/tokens';
import { GetCompanyUseCase } from '../application/use-case/company/get';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
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
  ],
  exports: [COMPANY_USECASE_TOKENS.create, COMPANY_USECASE_TOKENS.getAll],
})
export class CompanyModule {}
