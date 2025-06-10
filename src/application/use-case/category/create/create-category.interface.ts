import { CreateCategoryDto, CreateCategoryResultDto } from '../../../dtos';

export interface ICreateCategoryUseCase {
  execute(dto: CreateCategoryDto): Promise<CreateCategoryResultDto>;
}
