import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { getPaginationValues } from 'src/common/helpers/functions';
import { ResourcesService } from 'src/common/resource.service';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService extends ResourcesService {
  constructor(@InjectRepository(Stock) stockRepository: Repository<Stock>) {
    super(stockRepository);
  }

  async findByProductId(productId: string, pagination?: PaginationQueryDto) {
    const { limit, offset } = getPaginationValues(pagination);
    return await this.resourceRepository.find({
      where: {
        product: productId,
      },
      take: limit,
      skip: offset,
      orderBy: 'createdAt',
    });
  }
}
