import { Inject, Injectable } from '@nestjs/common';
import { EntityTarget } from 'typeorm';
import { CODE_GENERATOR_PERSISTENCE_TOKENS } from '../../infrastructure/tokens';
import { ICodeGeneratorPort } from '../ports';
import { ICodeGeneratorServicePort } from '../ports/code-generator-service.port';

@Injectable()
export class CodeGeneratorService implements ICodeGeneratorServicePort {
  constructor(
    @Inject(CODE_GENERATOR_PERSISTENCE_TOKENS.generateCode)
    private readonly codeGeneratorRepository: ICodeGeneratorPort,
  ) {}

  async generateCode<T>(
    entity: EntityTarget<T>,
    companyId: string,
  ): Promise<number> {
    return await this.codeGeneratorRepository.generateCode(entity, companyId);
  }
}
