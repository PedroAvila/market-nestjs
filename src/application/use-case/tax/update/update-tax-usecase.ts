import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxEntity } from '../../../../infrastructure/persistence/typeorm/entities';
import { UpdateTaxDto, UpdateTaxResultDto } from '../../../dtos';
import { IUpdateTaxUseCase } from './update-tax.interface';

export class UpdateTaxUseCase implements IUpdateTaxUseCase {
  constructor(
    @InjectRepository(TaxEntity)
    private readonly taxRepository: Repository<TaxEntity>,
  ) {}

  async execute(id: string, dto: UpdateTaxDto): Promise<UpdateTaxResultDto> {
    const tax = await this.taxRepository.findOne({
      where: { id },
    });

    if (!tax) throw new NotFoundException(`Tax with id ${id} not found.`);

    const updateTax = Object.assign(tax, dto);
    const entity = await this.taxRepository.save(updateTax);
    return {
      id: entity.id,
      name: entity.name,
      percentage: entity.percentage,
    };
  }
}
