import { Repository } from 'typeorm';
import { CreateCategoryDto, CreateCategoryResultDto } from '@application/dtos';
import { ICreateCategoryUseCase } from './create-category.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Inject, NotFoundException } from '@nestjs/common';
import { Category } from '@domain/entities';
import { ICodeGeneratorServicePort } from '../../../../domain/ports';
import { CODE_GENERATOR_SERVICE_TOKENS } from '../../../../infrastructure/tokens';
import {
  CategoryEntity,
  CategoryMapper,
  CompanyEntity,
} from '@infrastructure/persistence';
import { BusinessException } from 'infrastructure/common/exceptions';

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,

    @Inject(CODE_GENERATOR_SERVICE_TOKENS.generateCode)
    private readonly codeGeneratorServicePort: ICodeGeneratorServicePort,
  ) {}

  async execute(dto: CreateCategoryDto): Promise<CreateCategoryResultDto> {
    const existCompany = await this.companyRepository.findOne({
      where: { id: dto.companyId },
    });

    if (!existCompany)
      throw new BusinessException(
        `Company with ID ${dto.companyId} not found.`,
        HttpStatus.NOT_FOUND,
      );

    const category = Category.createBuilder()
      .companyId(dto.companyId)
      .code(
        await this.codeGeneratorServicePort.generateCode(
          CategoryEntity,
          dto.companyId,
        ),
      )
      .name(dto.name)
      .build();

    const newEntity = CategoryMapper.toEntity(category);
    const saveCategory = this.categoryRepository.create(newEntity);
    const entity = await this.categoryRepository.save(saveCategory);

    return {
      id: entity.id,
      companyId: entity.companyId,
      code: entity.code,
      name: entity.name,
    };
  }
}
