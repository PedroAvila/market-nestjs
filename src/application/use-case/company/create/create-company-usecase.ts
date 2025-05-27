import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../../../domain/entities';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../../../../infrastructure/persistence/typeorm/entities';
import { CompanyMapper } from '../../../../infrastructure/persistence/typeorm/mappers';
import { CreateCompanyDto, CreateCompanyResultDto } from '../../../dtos';
import { ICreateCompanyUseCase } from './create-company.interface';

@Injectable()
export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async execute(dto: CreateCompanyDto): Promise<CreateCompanyResultDto> {
    const exist = await this.companyRepository.findOne({
      where: { name: dto.name },
    });

    if (exist) {
      throw new ConflictException(
        `Company with name ${dto.name} already exists.`,
      );
    }

    const company = Company.createBuilder()
      .taxId(dto.taxId)
      .name(dto.name)
      .description(dto.description)
      .phone(dto.phone)
      .ruc(dto.ruc)
      .manager(dto.manager)
      .build();

    const newEntity = CompanyMapper.toEntity(company);
    const saveCompany = this.companyRepository.create(newEntity);
    const entity = await this.companyRepository.save(saveCompany);

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
