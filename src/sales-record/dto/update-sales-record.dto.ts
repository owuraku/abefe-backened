import { PartialType } from '@nestjs/swagger';
import { CreateSalesRecordDto } from './create-sales-record.dto';

export class UpdateSalesRecordDto extends PartialType(CreateSalesRecordDto) {}
