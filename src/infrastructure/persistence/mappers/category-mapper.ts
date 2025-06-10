import { Category } from '@domain/entities';
import { CategoryEntity } from '@infrastructure/persistence';

export class CategoryMapper {
  static toDomain(entity: CategoryEntity): Category {
    return new Category(entity.id, entity.companyId, entity.code, entity.name);
  }

  static toEntity(domain: Category): CategoryEntity {
    const entity = new CategoryEntity();
    if (domain.id && typeof domain.id === 'string' && domain.id.trim() !== '') {
      entity.id = domain.id;
    }
    entity.companyId = domain.companyId;
    entity.code = domain.code;
    entity.name = domain.name;
    return entity;
  }
}
