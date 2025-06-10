import {
  CreateTaxDto,
  CreateTaxResultDto,
  GetTaxResultDto,
  UpdateTaxDto,
  UpdateTaxResultDto,
} from '@application/dtos';
import {
  ICreateTaxUseCase,
  IGetByIdTaxUseCase,
  IGetTaxUseCase,
  IUpdateTaxUseCase,
} from '@application/use-case/tax';
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
import { TAX_USECASE_TOKENS } from '../../tokens';

@Controller('taxes')
export class TaxController {
  constructor(
    @Inject(TAX_USECASE_TOKENS.create)
    private readonly createTaxUseCase: ICreateTaxUseCase,
    @Inject(TAX_USECASE_TOKENS.update)
    private readonly updateTaxUseCase: IUpdateTaxUseCase,
    @Inject(TAX_USECASE_TOKENS.getAll)
    private readonly getTaxUseCase: IGetTaxUseCase,
    @Inject(TAX_USECASE_TOKENS.getById)
    private readonly getByIdTaxUseCase: IGetByIdTaxUseCase,
  ) {}

  @Get()
  async getAll(): Promise<GetTaxResultDto[]> {
    return await this.getTaxUseCase.execute();
  }

  @Get(':id')
  async single(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.getByIdTaxUseCase.execute(id);
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateTaxDto,
  ): Promise<CreateTaxResultDto> {
    return await this.createTaxUseCase.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTaxDto,
  ): Promise<UpdateTaxResultDto> {
    return await this.updateTaxUseCase.execute(id, dto);
  }
}
