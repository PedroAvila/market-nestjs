import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateCategoryResultDto,
  GetCategoryResultDto,
} from '@application/dtos';
import {
  ICreateCategoryUseCase,
  IGetAllCategoryByCompanyIdUseCase,
} from '@application/use-case/category';
import { CATEGORY_USECASE_TOKENS } from '../../tokens';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_USECASE_TOKENS.create)
    private readonly createCategoryUseCase: ICreateCategoryUseCase,

    @Inject(CATEGORY_USECASE_TOKENS.getAll)
    private readonly getAllCategoryByCompanyIdUseCase: IGetAllCategoryByCompanyIdUseCase,
  ) {}

  @Get(':companyId')
  async getAll(
    @Param('companyId', new ParseUUIDPipe()) companyId: string,
  ): Promise<GetCategoryResultDto[]> {
    return await this.getAllCategoryByCompanyIdUseCase.execute(companyId);
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateCategoryDto,
  ): Promise<CreateCategoryResultDto> {
    return await this.createCategoryUseCase.execute(dto);
  }
}
