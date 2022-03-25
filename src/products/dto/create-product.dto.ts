import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';
import { _IsExistingInDatabase } from 'src/common/validators/exists-in-database.validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The id of the product category',
  })
  @_IsExistingInDatabase({ tableName: 'categories' })
  readonly category: number;

  @ApiProperty({ description: 'The selling price of the product' })
  @IsPositive()
  readonly sellingPrice: number;

  @ApiProperty({ description: 'The cost price of the product' })
  @IsPositive()
  readonly costPrice: number;

  @ApiProperty({ description: 'The starting stock amount of the product' })
  @IsPositive()
  readonly currentStock: number;

  @ApiProperty({
    description: 'The status of the product (active or inactive)',
  })
  @IsOptional()
  @IsBoolean()
  readonly status: boolean;
}
