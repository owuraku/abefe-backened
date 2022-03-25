import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CustomValidatorsModule } from 'src/common/validators/validators.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CustomValidatorsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
