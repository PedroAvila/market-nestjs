import { GetTaxResultDto } from '@application/dtos';
import { TaxEntity } from '@infrastructure/persistence';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetTaxUseCase } from './get-tax.interface';

export class GetTaxUseCase implements IGetTaxUseCase {
  constructor(
    @InjectRepository(TaxEntity)
    private readonly taxRepository: Repository<TaxEntity>,
  ) {}

  async execute(): Promise<GetTaxResultDto[]> {
    const taxes = await this.taxRepository.find();

    return taxes.map((tax) => ({
      id: tax.id,
      name: tax.name,
      percentage: tax.percentage,
      createdAt: tax.createdAt,
    }));
  }
}
