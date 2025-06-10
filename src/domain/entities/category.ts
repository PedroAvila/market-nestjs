import { Builder } from 'builder-pattern';

export class Category {
  static createBuilder() {
    return Builder<Category>().id(null).companyId('').code(0).name('');
  }

  constructor(
    public readonly id: string | null,
    public readonly companyId: string,
    public readonly code: number,
    public readonly name: string,
  ) {}
}
