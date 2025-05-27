import { CreateTaxDto, CreateTaxResultDto } from '../../../dtos';

export interface ICreateTaxUseCase {
  execute(dto: CreateTaxDto): Promise<CreateTaxResultDto>;
}
