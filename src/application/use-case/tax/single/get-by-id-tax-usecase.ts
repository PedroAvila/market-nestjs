import { HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxEntity } from '@infrastructure/persistence';
import { GetByIdTaxResultDto } from '@application/dtos';
import { IGetByIdTaxUseCase } from './get-by-id-tax.interface';
import { BusinessException } from 'infrastructure/common/exceptions';

export class GetByIdTaxUseCase implements IGetByIdTaxUseCase {
  constructor(
    @InjectRepository(TaxEntity)
    private readonly taxRepository: Repository<TaxEntity>,
  ) {}

  async execute(id: string): Promise<GetByIdTaxResultDto> {
    const tax = await this.taxRepository.findOne({
      where: { id },
    });

    if (!tax)
      throw new BusinessException(
        `Tax with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return {
      id: tax.id,
      name: tax.name,
      percentage: tax.percentage,
      createdAt: tax.createdAt,
    };
  }
}
