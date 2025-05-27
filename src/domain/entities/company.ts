import { Builder } from 'builder-pattern';
import { StatusCompany } from '../enums';

export class Company {
  static createBuilder() {
    return Builder<Company>()
      .id(null)
      .taxId('')
      .name('')
      .description('')
      .phone('')
      .ruc('')
      .manager('')
      .createdAt(new Date())
      .status(StatusCompany.ENABLED);
  }

  constructor(
    public readonly id: string | null,
    public readonly taxId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly phone: string,
    public readonly ruc: string,
    public readonly manager: string,
    public readonly createdAt: Date,
    public readonly status: StatusCompany,
  ) {}
}
