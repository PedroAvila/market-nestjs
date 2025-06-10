import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateCategoryResultDto,
} from 'src/application/dtos';
import { ICreateCategoryUseCase } from '../../../application/use-case/category/create';
import { CATEGORY_USECASE_TOKENS } from 'src/infrastructure/tokens';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_USECASE_TOKENS.create)
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateCategoryDto,
  ): Promise<CreateCategoryResultDto> {
    return await this.createCategoryUseCase.execute(dto);
  }
}
