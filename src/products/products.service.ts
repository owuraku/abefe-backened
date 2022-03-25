import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourcesService } from 'src/common/resource.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService extends ResourcesService {
  /**
   *
   */
  constructor(
    @InjectRepository(Product) productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
