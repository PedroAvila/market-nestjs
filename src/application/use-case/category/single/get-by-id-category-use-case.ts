import { GetByIdCategoryResultDto } from '@application/dtos';
import { IGetByIdCategoryUseCase } from '@application/use-case/category';
import { CategoryEntity } from '@infrastructure/persistence';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from 'infrastructure/common/exceptions';
import { Repository } from 'typeorm';

@Injectable()
export class GetByIdCategoryUseCase implements IGetByIdCategoryUseCase {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async execute(id: string): Promise<GetByIdCategoryResultDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category)
      throw new BusinessException(
        `Category with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return {
      id: category.id,
      companyId: category.companyId,
      code: category.code,
      name: category.name,
    };
  }
}
