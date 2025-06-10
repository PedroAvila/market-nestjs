import { Company } from '@domain/entities';
import { CompanyEntity } from '@infrastructure/persistence';

export class CompanyMapper {
  static toDomain(entity: CompanyEntity): Company {
    return new Company(
      entity.id,
      entity.taxId,
      entity.name,
      entity.description,
      entity.phone,
      entity.ruc,
      entity.manager,
      entity.createdAt,
      entity.status,
    );
  }

  static toEntity(domain: Company): CompanyEntity {
    const entity = new CompanyEntity();
    if (domain.id && typeof domain.id === 'string' && domain.id.trim() !== '') {
      entity.id = domain.id;
    }
    entity.taxId = domain.taxId;
    entity.name = domain.name;
    entity.description = domain.description;
    entity.phone = domain.phone;
    entity.ruc = domain.ruc;
    entity.manager = domain.manager;
    entity.createdAt = domain.createdAt;
    entity.status = domain.status;
    return entity;
  }
}
