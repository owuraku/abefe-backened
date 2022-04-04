import { SalesRecordController } from './sales-record.controller';
import { SalesRecordService } from './sales-record.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SalesRecordController],
  providers: [SalesRecordService],
})
export class SalesRecordModule {}
