import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxEntity } from '../../../../infrastructure/persistence/typeorm/entities';
import { GetByIdTaxResultDto } from '../../../dtos';
import { IGetByIdTaxUseCase } from './get-by-id-tax.interface';

export class GetByIdTaxUseCase implements IGetByIdTaxUseCase {
  constructor(
    @InjectRepository(TaxEntity)
    private readonly taxRepository: Repository<TaxEntity>,
  ) {}

  async execute(id: string): Promise<GetByIdTaxResultDto> {
    const tax = await this.taxRepository.findOne({
      where: { id },
    });

    if (!tax) throw new NotFoundException(`Tax with id ${id} not found`);

    return {
      id: tax.id,
      name: tax.name,
      percentage: tax.percentage,
      createdAt: tax.createdAt,
    };
  }
}
