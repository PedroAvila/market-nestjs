import { GetByIdCompanyResultDto } from '@application/dtos';

export interface IGetByIdCompanyUseCase {
  execute(id: string): Promise<GetByIdCompanyResultDto>;
}
