import { GetCompanyResultDto } from '../../../dtos';

export interface IGetCompanyUseCase {
  execute(): Promise<GetCompanyResultDto[]>;
}
