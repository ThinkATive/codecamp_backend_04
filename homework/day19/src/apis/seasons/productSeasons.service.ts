import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSeason } from './entities/productSeason.entity';

@Injectable()
export class ProductSeasonsService {
  constructor(
    @InjectRepository(ProductSeason)
    private readonly productSeasonRepository: Repository<ProductSeason>,
  ) {}
  async create({ seasonName }) {
    // DB에 카테고리 등록
    const result = await this.productSeasonRepository.save({
      seasonName: seasonName,
    });
    return result;
  }
}
