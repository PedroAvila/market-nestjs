import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    name: 'Tax ID',
    type: 'string',
    description: 'The tax ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  taxId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: 'string',
    description: 'The name of the company',
    example: 'John Doe Enterprises',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Description',
    type: 'string',
    description: 'The description of the company',
    example: 'A valuable company',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Phone',
    type: 'string',
    description: 'The phone number of the company',
    example: '123-456-7890',
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
    description: 'The manager of the company',
    example: 'Jane Doe',
  })
  manager: string;
}
