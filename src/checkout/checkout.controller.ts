import { Controller, Get, Post } from '@nestjs/common';
import { PromotionService } from 'src/promotion/promotion.service';
import { CheckoutService } from './checkout.service';
import { CheckoutDTO } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly stateService: CheckoutService,
    private readonly promotionService: PromotionService,
  ) {}

  @Get()
  async findOne(id: string): Promise<CheckoutDTO> {
    const checkout = await this.stateService.getCheckout(id);

    return {
      id: checkout.id,
      status: checkout.status,
      scannedProducts: checkout.scannedProducts.map((product) => {
        return {
          id: product.id,
          externalId: product.externalId,
          title: product.title,
          basePrice: product.price,
          finalPrice: this.promotionService.applyPromotions(
            product,
            checkout.scannedProducts,
          ),
        };
      }),
      appliedPromotions: checkout.appliedPromotions,
    };
  }

  @Post()
  async initiateCheckout() {
    const checkout = this.stateService.createCheckout();

    return checkout.id;
  }
}
