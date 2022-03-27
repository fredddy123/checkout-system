import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { IProduct } from './types/product';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: DbService) {}

  findById(id: string): Promise<IProduct | undefined> {
    return this.dbService.products.getProduct(id);
  }
}
