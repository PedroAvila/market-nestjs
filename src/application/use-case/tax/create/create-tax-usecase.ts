import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax } from '../../../../domain/entities';
import { TaxEntity } from '../../../../infrastructure/persistence/typeorm/entities';
import { TaxMapper } from '../../../../infrastructure/persistence/typeorm/mappers';
import { CreateTaxDto, CreateTaxResultDto } from '../../../dtos';
import { ICreateTaxUseCase } from './create-tax.interface';

@Injectable()
export class CreateTaxUseCase implements ICreateTaxUseCase {
  constructor(
    @InjectRepository(TaxEntity)
    private readonly taxRespository: Repository<TaxEntity>,
  ) {}

  async execute(dto: CreateTaxDto): Promise<CreateTaxResultDto> {
    const exist = await this.taxRespository.findOne({
      where: { name: dto.name },
    });

    if (exist) {
      throw new ConflictException(`Tax with name ${dto.name} already exists.`);
    }

    const tax = Tax.createBuilder()
      .name(dto.name)
      .percentage(dto.percentage)
      .build();

    const newEntity = TaxMapper.toEntity(tax);
    const saveTax = this.taxRespository.create(newEntity);
    const entity = await this.taxRespository.save(saveTax);

    return {
      id: entity.id,
      name: entity.name,
      percentage: entity.percentage,
      createdAt: entity.createdAt,
    };
  }
}
