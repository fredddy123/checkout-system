import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';
import { AbstractUnconditionalProductPromotion } from './base/abstract-unconditional-product-promotion';

export class UnconditionalPercentageDiscountOnProduct extends AbstractUnconditionalProductPromotion {
  protected applyPromotionForOneProduct(
    product: IProductWithAppliedPromotions,
  ): IProductWithAppliedPromotions {
    return {
      ...product,
      finalPrice:
        product.finalPrice - product.finalPrice * 0.01 * this.discountValue,
      appliedPromotions: [
        ...(product.appliedPromotions || []),
        this.promotionId,
      ],
    };
  }
}
