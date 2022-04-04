import { ApiProperty } from '@nestjs/swagger';

export class CreateSalesRecordDto {
  @ApiProperty({
    description: '',
  })
  readonly name: string;
}
