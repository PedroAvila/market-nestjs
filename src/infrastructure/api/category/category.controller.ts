import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateCategoryResultDto,
  GetByIdCategoryResultDto,
  GetCategoryResultDto,
  UpdateCategoryDto,
  UpdateCategoryResultDto,
} from '@application/dtos';
import {
  ICreateCategoryUseCase,
  IGetAllCategoryByCompanyIdUseCase,
  IGetByIdCategoryUseCase,
  IUpdateCategoryUseCase,
} from '@application/use-case/category';
import { CATEGORY_USECASE_TOKENS } from '../../tokens';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_USECASE_TOKENS.create)
    private readonly createCategoryUseCase: ICreateCategoryUseCase,

    @Inject(CATEGORY_USECASE_TOKENS.getAll)
    private readonly getAllCategoryByCompanyIdUseCase: IGetAllCategoryByCompanyIdUseCase,

    @Inject(CATEGORY_USECASE_TOKENS.update)
    private readonly updateCategoryUseCase: IUpdateCategoryUseCase,

    @Inject(CATEGORY_USECASE_TOKENS.getById)
    private readonly getbyidCategoryUseCase: IGetByIdCategoryUseCase,
  ) {}

  @Get('/company/:companyId')
  async getAll(
    @Param('companyId', new ParseUUIDPipe()) companyId: string,
  ): Promise<GetCategoryResultDto[]> {
    return await this.getAllCategoryByCompanyIdUseCase.execute(companyId);
  }

  @Get(':id')
  async single(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<GetByIdCategoryResultDto> {
    return await this.getbyidCategoryUseCase.execute(id);
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateCategoryDto,
  ): Promise<CreateCategoryResultDto> {
    return await this.createCategoryUseCase.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResultDto> {
    return await this.updateCategoryUseCase.execute(id, dto);
  }
}
