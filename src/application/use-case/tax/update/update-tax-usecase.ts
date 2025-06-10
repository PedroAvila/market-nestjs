import { UpdateTaxDto, UpdateTaxResultDto } from '@application/dtos';
import { TaxEntity } from '@infrastructure/persistence';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUpdateTaxUseCase } from './update-tax.interface';

@Injectable()
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
