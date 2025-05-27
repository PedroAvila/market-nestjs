import { Repository } from 'typeorm';
import { GetTaxResultDto } from '../../../dtos';
import { IGetTaxUseCase } from './get-tax.interface';
import { TaxEntity } from '../../../../infrastructure/persistence/typeorm/entities';
import { InjectRepository } from '@nestjs/typeorm';

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
