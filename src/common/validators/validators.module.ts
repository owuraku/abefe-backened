import { Module } from '@nestjs/common';
import { ExistsInDatabase } from './exists-in-database.validator';

@Module({
  imports: [],
  controllers: [],
  providers: [ExistsInDatabase],
  exports: [ExistsInDatabase],
})
export class CustomValidatorsModule {}
