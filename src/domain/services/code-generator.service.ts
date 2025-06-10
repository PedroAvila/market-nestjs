import { EntityTarget } from 'typeorm';
import { ICodeGeneratorServicePort } from '../ports/code-generator-service.port';
import { ICodeGeneratorPort } from '../ports';
import { Inject, Injectable } from '@nestjs/common';
import { CODE_GENERATOR_PERSISTENCE_TOKENS } from 'src/infrastructure/tokens';

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
