import { Repository } from 'typeorm';
import { GetByIdCompanyResultDto } from '@application/dtos';
import { IGetByIdCompanyUseCase } from './get-by-id-company-interface';
import { CompanyEntity } from '@infrastructure/persistence';

import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { BusinessException } from 'infrastructure/common/exceptions';

@Injectable()
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
      throw new BusinessException(
        `Company with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

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
