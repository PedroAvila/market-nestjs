import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
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
