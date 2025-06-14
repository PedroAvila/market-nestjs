import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity, TaxEntity } from '@infrastructure/persistence';
import { UpdateCompanyDto, UpdateCompanyResultDto } from '@application/dtos';
import { IUpdateCompanyUseCase } from './update-company.interface';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { BusinessException } from 'infrastructure/common/exceptions';

@Injectable()
export class UpdateCompanyUseCase implements IUpdateCompanyUseCase {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(TaxEntity)
    private readonly taxRepository: Repository<TaxEntity>,
  ) {}

  async execute(
    id: string,
    dto: UpdateCompanyDto,
  ): Promise<UpdateCompanyResultDto> {
    const existTax = this.taxRepository.exists({
      where: { id: dto.taxId },
    });

    if (!existTax)
      throw new BusinessException(
        `Tax with id ${dto.taxId} not found.`,
        HttpStatus.NOT_FOUND,
      );

    const company = await this.companyRepository.findOne({
      where: { id: id },
    });

    if (!company)
      throw new BusinessException(
        `Company with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );

    const updateCompany = Object.assign(company, dto);
    const entity = await this.companyRepository.save(updateCompany);

    return {
      id: entity.id,
      taxId: entity.taxId,
      name: entity.name,
      description: entity.description,
      phone: entity.phone,
      ruc: entity.ruc,
      manager: entity.manager,
      createdAt: entity.createdAt,
      status: entity.status,
    };
  }
}
