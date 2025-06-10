import { CreateTaxDto, CreateTaxResultDto } from '@application/dtos';

export interface ICreateTaxUseCase {
  execute(dto: CreateTaxDto): Promise<CreateTaxResultDto>;
}
