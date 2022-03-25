import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { getPaginationValues } from 'src/common/helpers/functions';
import { ResourcesService } from 'src/common/resource.service';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoriesService extends ResourcesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(categoryRepository);
  }

  async findProductsByCategoryId(id: string, pagination: PaginationQueryDto) {
    const { limit, offset } = getPaginationValues(pagination);
    return await this.productRepository.find({
      skip: offset,
      take: limit,
      where: {
        category: id,
      },
    });
  }
}
