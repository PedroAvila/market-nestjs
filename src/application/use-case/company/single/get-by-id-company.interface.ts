import { Repository } from 'typeorm';
import { GetByIdCompanyResultDto } from '../../../dtos';
import { IGetByIdCompanyUseCase } from './get-by-id-company-usecase';
import { CompanyEntity } from 'src/infrastructure/persistence/typeorm/entities';

import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

export class GetByIdCompanyUseCase implements IGetByIdCompanyUseCase {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async execute(id: string): Promise<GetByIdCompanyResultDto> {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company)
      throw new NotFoundException(`Company with id ${id} not found`);

    return {
      id: company.id,
      taxId: company.taxId,
      name: company.name,
      description: company.description,
      phone: company.phone,
      ruc: company.ruc,
      manager: company.manager,
      createdAt: company.createdAt,
      status: company.status,
    };
  }
}
