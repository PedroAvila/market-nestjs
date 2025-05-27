import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ICreateCompanyUseCase } from '../../../application/use-case/company/create';
import {
  CreateCompanyDto,
  CreateCompanyResultDto,
  GetCompanyResultDto,
} from '../../../application/dtos';
import { COMPANY_USECASE_TOKENS } from 'src/infrastructure/tokens';
import { IGetCompanyUseCase } from '../../../application/use-case/company/get';

@Controller('companies')
export class CompanyController {
  constructor(
    @Inject(COMPANY_USECASE_TOKENS.getAll)
    private readonly getCompanyUseCase: IGetCompanyUseCase,
    @Inject(COMPANY_USECASE_TOKENS.create)
    private readonly createCompanyUseCase: ICreateCompanyUseCase,
  ) {}

  @Get()
  async getAll(): Promise<GetCompanyResultDto[]> {
    return await this.getCompanyUseCase.execute();
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateCompanyDto,
  ): Promise<CreateCompanyResultDto> {
    return await this.createCompanyUseCase.execute(dto);
  }
}
