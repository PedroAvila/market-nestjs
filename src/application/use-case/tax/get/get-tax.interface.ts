import { GetTaxResultDto } from '../../../dtos';

export interface IGetTaxUseCase {
  execute(): Promise<GetTaxResultDto[]>;
}
