import { UpdateCompanyDto, UpdateCompanyResultDto } from '../../../dtos';

export interface IUpdateCompanyUseCase {
  execute(id: string, dto: UpdateCompanyDto): Promise<UpdateCompanyResultDto>;
}
