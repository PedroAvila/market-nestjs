import { GetCategoryResultDto } from '@application/dtos';
import { CategoryEntity, CompanyEntity } from '@infrastructure/persistence';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetAllCategoryByCompanyIdUseCase } from './get-all-category-by-companyid.interface';

export class GetAllCategoryByCompanyIdUseCase
  implements IGetAllCategoryByCompanyIdUseCase
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRespository: Repository<CategoryEntity>,

    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}
  async execute(companyId: string): Promise<GetCategoryResultDto[]> {
    const existCompany = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!existCompany)
      throw new NotFoundException(`Company with id ${companyId} not found`);

    const categories = await this.categoryRespository.find({
      where: { companyId: companyId },
    });

    return categories.map((category) => ({
      id: category.id,
      companyId: category.companyId,
      code: category.code,
      name: category.name,
    }));
  }
}
