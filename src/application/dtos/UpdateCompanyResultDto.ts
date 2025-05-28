import { StatusCompany } from 'src/domain/enums';

export class UpdateCompanyResultDto {
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
