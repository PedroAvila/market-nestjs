import { GetByIdCategoryResultDto } from '@application/dtos';

export interface IGetByIdCategoryUseCase {
  execute(id: string): Promise<GetByIdCategoryResultDto>;
}
