import { StatusCompany } from '../../domain/enums';

export class GetByIdCompanyResultDto {
  id: string;
  taxId: string;
  name: string;
  description: string;
  phone: string;
  ruc: string;
  manager: string;
  createdAt: Date;
  status: StatusCompany;
}
