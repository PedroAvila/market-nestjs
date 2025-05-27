import { Builder } from 'builder-pattern';

export class Tax {
  static createBuilder() {
    return Builder<Tax>().id(null).name('').percentage(0).createdAt(new Date());
  }

  static updateBuilder() {
    return Builder<Tax>().id(null).name('').percentage(0);
  }

  constructor(
    public readonly id: string | null,
    public readonly name: string,
    public readonly percentage: number,
    public readonly createdAt: Date,
  ) {}
}
