import { GetByIdTaxResultDto } from '../../../dtos';

export interface IGetByIdTaxUseCase {
  execute(id: string): Promise<GetByIdTaxResultDto>;
}
