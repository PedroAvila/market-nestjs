import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    name: 'Company ID',
    type: 'string',
    description: 'The ID of the company to which the category belongs',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  companyId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: 'string',
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;
}
