import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from './types/product';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: DbService) {}

  findById(id: string): Promise<IProduct | undefined> {
    return this.dbService.products.getProduct(id);
  }

  async createPoduct(product: CreateProductDto): Promise<string> {
    const id = `${Math.random()}`.slice(2);

    await this.dbService.products.addProduct({
      ...product,
      id,
    });

    return id;
  }

  getAllProducts(): Promise<IProduct[]> {
    return this.dbService.products.getAllProducts();
  }
}
