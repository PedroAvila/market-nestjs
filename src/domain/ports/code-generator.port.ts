import { EntityTarget } from 'typeorm';

export interface ICodeGeneratorPort {
  generateCode<T>(entity: EntityTarget<T>, companyId: string): Promise<number>;
}
