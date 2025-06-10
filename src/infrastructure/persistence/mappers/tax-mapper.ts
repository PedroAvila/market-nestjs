import { Tax } from '@domain/entities';
import { TaxEntity } from '@infrastructure/persistence';

export class TaxMapper {
  static toDomain(entity: TaxEntity): Tax {
    return new Tax(entity.id, entity.name, entity.percentage, entity.createdAt);
  }

  static toEntity(domain: Tax): TaxEntity {
    const entity = new TaxEntity();
    if (domain.id && typeof domain.id === 'string' && domain.id.trim() !== '') {
      entity.id = domain.id;
    }
    entity.name = domain.name;
    entity.percentage = domain.percentage;
    entity.createdAt = domain.createdAt;
    return entity;
  }
}
