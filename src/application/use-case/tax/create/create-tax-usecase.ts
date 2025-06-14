import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax } from '@domain/entities';
import { CreateTaxDto, CreateTaxResultDto } from '@application/dtos';
import { ICreateTaxUseCase } from './create-tax.interface';
import { TaxEntity, TaxMapper } from '@infrastructure/persistence';
import { BusinessException } from 'infrastructure/common/exceptions';

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
      throw new BusinessException(
        `Tax with name ${dto.name} already exists.`,
        HttpStatus.CONFLICT,
      );
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
