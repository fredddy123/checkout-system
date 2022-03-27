import { AbstractUnconditionalProductPromotion } from './base/abstract-unconditional-product-promotion';
import { PromotionTypes } from './base/promotion-types';

export class UnconditionalPercentageDiscountOnProduct extends AbstractUnconditionalProductPromotion {
  static type: PromotionTypes = PromotionTypes.CONDITIONAL_RECEIPT_PROMOTION;

  protected applyPromotionForOneProduct(
    product: IProduct,
  ): IProductWithAppliedPromotions {
    return {
      ...product,
      finalPrice:
        product.basePrice - product.basePrice * 0.01 * this.discountValue,
    };
  }
}
