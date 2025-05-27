import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaxUseCase } from '../application/use-case/tax/create';
import { TaxController } from 'src/infrastructure/api/tax/tax.controller';
import { TaxEntity } from '../infrastructure/persistence/typeorm/entities';
import { UpdateTaxUseCase } from '../application/use-case/tax/update';
import { GetTaxUseCase } from '../application/use-case/tax/get';
import { GetByIdTaxUseCase } from '../application/use-case/tax/single';
import { CompanyModule } from './company.module';
import { TAX_USECASE_TOKENS } from 'src/infrastructure/tokens';

@Module({
  imports: [TypeOrmModule.forFeature([TaxEntity]), CompanyModule],
  controllers: [TaxController],
  providers: [
    {
      provide: TAX_USECASE_TOKENS.create,
      useClass: CreateTaxUseCase,
    },
    {
      provide: TAX_USECASE_TOKENS.update,
      useClass: UpdateTaxUseCase,
    },
    {
      provide: TAX_USECASE_TOKENS.getAll,
      useClass: GetTaxUseCase,
    },
    {
      provide: TAX_USECASE_TOKENS.getById,
      useClass: GetByIdTaxUseCase,
    },
  ],
  exports: [
    TAX_USECASE_TOKENS.create,
    TAX_USECASE_TOKENS.update,
    TAX_USECASE_TOKENS.getAll,
    TAX_USECASE_TOKENS.getById,
  ],
})
export class TaxModule {}
