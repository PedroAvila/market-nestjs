import { GetCategoryResultDto } from '@application/dtos';

export interface IGetAllCategoryByCompanyIdUseCase {
  execute(companyId: string): Promise<GetCategoryResultDto[]>;
}
