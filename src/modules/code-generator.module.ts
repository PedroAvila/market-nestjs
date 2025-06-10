import { Module } from '@nestjs/common';
import { CodeGeneratorService } from '../domain/services/code-generator.service';
import { CodeGeneratorAdapter } from '../infrastructure/adapters/code-generator.adapter';
import {
  CODE_GENERATOR_PERSISTENCE_TOKENS,
  CODE_GENERATOR_SERVICE_TOKENS,
} from '../infrastructure/tokens';

@Module({
  providers: [
    {
      provide: CODE_GENERATOR_PERSISTENCE_TOKENS.generateCode,
      useClass: CodeGeneratorAdapter,
    },
    {
      provide: CODE_GENERATOR_SERVICE_TOKENS.generateCode,
      useClass: CodeGeneratorService,
    },
  ],
  exports: [CODE_GENERATOR_SERVICE_TOKENS.generateCode],
})
export class CodeGeneratorModule {}
