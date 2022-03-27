import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { PromotionService } from 'src/promotion/promotion.service';
import { IFormedResponse } from 'src/types/formed-response';
import { CheckoutService } from './checkout.service';
import { CheckoutDTO } from './dto/checkout.dto';
import { ProductDTO } from './dto/product.dto';
import { ScanProductDto } from './dto/scan-product.dto';

@Controller('checkouts')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly productService: ProductService,
    private readonly promotionService: PromotionService,
  ) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<IFormedResponse<CheckoutDTO | undefined>> {
    const checkout = await this.checkoutService.getCheckout(id);

    if (!checkout) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const products: IProduct[] = [];

    for (const productId of checkout.scannedProducts) {
      const foundProduct = await this.productService.findById(productId);

      if (!foundProduct) {
        throw new Error('scanned product does not exist');
      }

      products.push(foundProduct);
    }

    const reponseCheckout: CheckoutDTO = {
      ...checkout,
      scannedProducts: await this.promotionService.applyPromotions(products),
      appliedPromotions: [],
    };

    // reponseCheckout.appliedPromotions = this.promotionService.applyPromotions(products);

    return {
      status: HttpStatus.OK,
      data: reponseCheckout,
    };
  }

  @Post()
  async initiateCheckout() {
    const checkout = this.checkoutService.createCheckout();

    return checkout.id;
  }

  @Get()
  async findAll(): Promise<IFormedResponse<ICheckout[]>> {
    const checkouts = await this.checkoutService.getAllCheckouts();

    return {
      status: HttpStatus.OK,
      data: checkouts,
    };
  }

  @Post(':id/scan')
  async scan(@Param('id') id: string, @Body() scanProductDTO: ScanProductDto) {
    const result = await this.checkoutService.scan(
      id,
      scanProductDTO.productId,
    );

    return {
      status: HttpStatus.OK,
      data: result,
    };
  }
}
