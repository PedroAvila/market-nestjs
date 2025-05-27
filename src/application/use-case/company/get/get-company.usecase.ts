import { GetCompanyResultDto } from 'src/application/dtos';
import { IGetCompanyUseCase } from './get-company.interface';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../../../../infrastructure/persistence/typeorm/entities';
import { InjectRepository } from '@nestjs/typeorm';

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
