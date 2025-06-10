import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxController } from '../infrastructure/api/tax/tax.controller';
import { TaxEntity } from '@infrastructure/persistence';
import { TAX_USECASE_TOKENS } from '../infrastructure/tokens';
import {
  CreateTaxUseCase,
  GetByIdTaxUseCase,
  GetTaxUseCase,
  UpdateTaxUseCase,
} from '@application/use-case/tax';

@Module({
  imports: [TypeOrmModule.forFeature([TaxEntity])],
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
    TypeOrmModule.forFeature([TaxEntity]),
    TAX_USECASE_TOKENS.create,
    TAX_USECASE_TOKENS.update,
    TAX_USECASE_TOKENS.getAll,
    TAX_USECASE_TOKENS.getById,
  ],
})
export class TaxModule {}
