import { EntityTarget } from 'typeorm';

export interface ICodeGeneratorServicePort {
  generateCode<T>(entity: EntityTarget<T>, companyId: string): Promise<number>;
}
