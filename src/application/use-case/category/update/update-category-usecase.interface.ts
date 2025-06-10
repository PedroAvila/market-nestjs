import { UpdateCategoryDto, UpdateCategoryResultDto } from '@application/dtos';

export interface IUpdateCategoryUseCase {
  execute(id: string, dto: UpdateCategoryDto): Promise<UpdateCategoryResultDto>;
}
