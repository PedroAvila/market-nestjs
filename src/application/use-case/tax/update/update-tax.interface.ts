import { UpdateTaxDto, UpdateTaxResultDto } from '../../../dtos';

export interface IUpdateTaxUseCase {
  execute(id: string, dto: UpdateTaxDto): Promise<UpdateTaxResultDto>;
}
