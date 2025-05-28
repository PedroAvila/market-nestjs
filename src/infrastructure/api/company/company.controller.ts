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
import { ICreateCompanyUseCase } from '../../../application/use-case/company/create';
import {
  CreateCompanyDto,
  CreateCompanyResultDto,
  GetCompanyResultDto,
  UpdateCompanyDto,
  UpdateCompanyResultDto,
} from '../../../application/dtos';
import { COMPANY_USECASE_TOKENS } from 'src/infrastructure/tokens';
import { IGetCompanyUseCase } from '../../../application/use-case/company/get';
import { IUpdateCompanyUseCase } from '../../../application/use-case/company/update';
import { IGetByIdCompanyUseCase } from '../../../application/use-case/company/single';

@Controller('companies')
export class CompanyController {
  constructor(
    @Inject(COMPANY_USECASE_TOKENS.getAll)
    private readonly getCompanyUseCase: IGetCompanyUseCase,
    @Inject(COMPANY_USECASE_TOKENS.create)
    private readonly createCompanyUseCase: ICreateCompanyUseCase,
    @Inject(COMPANY_USECASE_TOKENS.update)
    private readonly updateCompanyUseCase: IUpdateCompanyUseCase,
    @Inject(COMPANY_USECASE_TOKENS.getById)
    private readonly getByIdCompanyUseCase: IGetByIdCompanyUseCase,
  ) {}

  @Get()
  async getAll(): Promise<GetCompanyResultDto[]> {
    return await this.getCompanyUseCase.execute();
  }

  @Get(':id')
  async single(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<GetCompanyResultDto> {
    return await this.getByIdCompanyUseCase.execute(id);
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateCompanyDto,
  ): Promise<CreateCompanyResultDto> {
    return await this.createCompanyUseCase.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCompanyDto,
  ): Promise<UpdateCompanyResultDto> {
    return await this.updateCompanyUseCase.execute(id, dto);
  }
}
