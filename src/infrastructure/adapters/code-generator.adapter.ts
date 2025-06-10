import { DataSource, EntityTarget } from 'typeorm';
import { ICodeGeneratorPort } from '../../domain/ports';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeGeneratorAdapter implements ICodeGeneratorPort {
  constructor(private readonly dataSource: DataSource) {}

  async generateCode<T>(
    entity: EntityTarget<T>,
    companyId: string,
  ): Promise<number> {
    const metadata = this.dataSource.getMetadata(entity);
    const tableName = metadata.tableName;

    const query = `
            SELECT COALESCE(MAX(code::integer), 0) + 1 AS "maxCode"
            FROM ${tableName}
            WHERE "companyId" = $1
        `;

    const result = await this.dataSource.query(query, [companyId]);
    return result[0]?.maxCode;
  }
}
