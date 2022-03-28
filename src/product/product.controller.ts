import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IFormedResponse } from 'src/types/formed-response';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { IProduct } from './types/product';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() data: CreateProductDto,
  ): Promise<IFormedResponse<{ id: string }>> {
    const id = await this.productService.createPoduct(data);

    return {
      status: HttpStatus.OK,
      data: {
        id,
      },
    };
  }

  @Get()
  async findAll(): Promise<IFormedResponse<IProduct[]>> {
    const products = await this.productService.getAllProducts();

    return {
      status: HttpStatus.OK,
      data: products,
    };
  }
}
