import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty({ description: 'Describe reason for update' })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Number to add or remove',
  })
  @IsPositive()
  readonly updateNumber: number;

  // @IsOptional()
  // readonly balanceBefore?: number;

  // @IsOptional()
  // readonly balanceAfter?: number;

  // @IsOptional()
  // readonly product?: string;

  // @IsOptional()
  // readonly createdBy?: number;

  // @IsOptional()
  // readonly createdAt?: string;
}
