import { UpdateTaxDto, UpdateTaxResultDto } from '@application/dtos';

export interface IUpdateTaxUseCase {
  execute(id: string, dto: UpdateTaxDto): Promise<UpdateTaxResultDto>;
}
