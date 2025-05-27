import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTaxDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: 'string',
    description: 'The name of the tax',
    example: 'Tasa 10%',
  })
  name: string;

  @IsNumber({}, { message: 'Percentage must be a number.' })
  @IsNotEmpty()
  @Min(0, { message: 'The percentage cannot be less than 0.' })
  @Max(100, { message: 'The percentage cannot exceed 100.' })
  @ApiProperty({
    name: 'Percentage',
    type: 'number',
    description: 'The percentage of the tax',
    example: 10,
  })
  percentage: number;
}
