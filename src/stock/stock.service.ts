import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
  ) {}

  deductFromStock(toUpdate: UpdateStockDto) {
    // this.stockRepository.findOne()
    this.stockRepository.insert([]);
  }

  addToStock(toUpdate: UpdateStockDto) {
    this.stockRepository.insert([]);
  }
}
