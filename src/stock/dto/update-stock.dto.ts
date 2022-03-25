import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty({ description: 'Describe reason for update' })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Number to add or remove',
  })
  @IsPositive()
  readonly updateNumber: number;
}
