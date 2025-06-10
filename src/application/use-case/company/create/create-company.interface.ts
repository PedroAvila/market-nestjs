import { CreateCompanyDto, CreateCompanyResultDto } from '@application/dtos';

export interface ICreateCompanyUseCase {
  execute(dto: CreateCompanyDto): Promise<CreateCompanyResultDto>;
}
