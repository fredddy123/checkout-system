import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductService } from 'src/product/product.service';
import { IProduct } from 'src/product/types/product';
import { PromotionService } from 'src/promotion/promotion.service';
import { IFormedResponse } from 'src/types/formed-response';
import { CheckoutService } from './checkout.service';
import { CheckoutDTO } from './dto/checkout.dto';
import { ScanProductDto } from './dto/scan-product.dto';
import { ICheckout } from './types/checkout';

@Controller('checkouts')
@UseGuards(AuthGuard)
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
        throw new Error(`scanned product with id ${productId} does not exist`);
      }

      products.push(foundProduct);
    }

    const receiptWithAppliedPromotions =
      await this.promotionService.applyPromotions(products);

    return {
      status: HttpStatus.OK,
      data: {
        ...checkout,
        scannedProducts: receiptWithAppliedPromotions.products,
        baseTotal: receiptWithAppliedPromotions.baseTotal,
        finalTotal: receiptWithAppliedPromotions.finalTotal,
        appliedPromotions: receiptWithAppliedPromotions.appliedPromotions,
      },
    };
  }

  @Post()
  async initiateCheckout(): Promise<string> {
    const checkout = await this.checkoutService.createCheckout();

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
    await this.checkoutService.scan(id, scanProductDTO.productId);

    return {
      status: HttpStatus.OK,
    };
  }

  @Post(':id/finish')
  async finish(@Param('id') id: string) {
    await this.checkoutService.finish(id);

    return {
      status: HttpStatus.OK,
    };
  }

  @Post(':id/payment')
  async startPayment(@Param('id') id: string) {
    await this.checkoutService.switchToPaymentStatus(id);

    return {
      status: HttpStatus.OK,
    };
  }

  @Delete(':id/scan/:productId')
  async remove(@Param('id') id: string, @Param('productId') productId: string) {
    await this.checkoutService.remove(id, productId);

    return {
      status: HttpStatus.OK,
    };
  }
}
