import { GetCompanyResultDto } from '@application/dtos';
import { CompanyEntity } from '@infrastructure/persistence';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetCompanyUseCase } from './get-company.interface';

export class GetCompanyUseCase implements IGetCompanyUseCase {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async execute(): Promise<GetCompanyResultDto[]> {
    const companies = await this.companyRepository.find();

    return companies.map((company) => ({
      id: company.id,
      taxId: company.taxId,
      name: company.name,
      description: company.description,
      phone: company.phone,
      ruc: company.ruc,
      manager: company.manager,
      createdAt: company.createdAt,
      status: company.status,
    }));
  }
}
