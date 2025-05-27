import { CustomerType } from '../enums/customer-type';

export class Customer {
  constructor(
    public readonly id: string,
    public readonly taxId: string,
    public readonly name: string,
    public readonly customerType: CustomerType,
    public readonly address: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly typeDocumentId: string,
    public readonly documentNumber: string,
    public readonly createdAt: Date,
  ) {}
}
