import { UpdateCategoryDto, UpdateCategoryResultDto } from '@application/dtos';
import { CategoryEntity } from '@infrastructure/persistence';
import { HttpStatus, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUpdateCategoryUseCase } from './update-category-usecase.interface';
import { BusinessException } from 'infrastructure/common/exceptions';

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async execute(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResultDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category)
      throw new BusinessException(
        `Category with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );

    const updateCategory = Object.assign(category, dto);
    const entity = await this.categoryRepository.save(updateCategory);

    return {
      id: entity.id,
      companyId: entity.companyId,
      code: entity.code,
      name: entity.name,
    };
  }
}
