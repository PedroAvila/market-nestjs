import { CreateCompanyDto, CreateCompanyResultDto } from 'src/application/dtos';

export interface ICreateCompanyUseCase {
  execute(dto: CreateCompanyDto): Promise<CreateCompanyResultDto>;
}
