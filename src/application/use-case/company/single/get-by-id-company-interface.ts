import { GetByIdCompanyResultDto } from '../../../dtos';

export interface IGetByIdCompanyUseCase {
  execute(id: string): Promise<GetByIdCompanyResultDto>;
}
