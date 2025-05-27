import { StatusCompany } from '../../domain/enums';

export class GetCompanyResultDto {
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
