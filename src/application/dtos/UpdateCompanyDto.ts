import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidStatus } from '../../infrastructure/common/validators';

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    name: 'TaxId',
    type: 'string',
    description: 'The ID of the tax associated with the company',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  taxId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: 'string',
    description: 'The name of the company',
    example: 'Tech Solutions Ltd.',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Description',
    type: 'string',
    description: 'The description of the company',
    example: 'A leading tech solutions provider.',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Phone',
    type: 'string',
    description: 'The phone number of the company',
    example: '+1 (555) 123-4567',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'RUC',
    type: 'string',
    description: 'The RUC of the company',
    example: '12345678901',
  })
  ruc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Manager',
    type: 'string',
    description: 'The name of the company manager',
    example: 'John Doe',
  })
  manager: string;

  @IsInt()
  @IsValidStatus({
    message: 'Status must be either DISABLED (0) or ENABLED (1).',
  })
  @ApiProperty({
    name: 'Status',
    type: 'number',
    description: 'The status of the company (0 for DISABLED, 1 for ENABLED)',
    example: 1,
  })
  status: number;
}
