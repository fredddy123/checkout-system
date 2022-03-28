import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';
import { AbstractUnconditionalProductPromotion } from './base/abstract-unconditional-product-promotion';

export class UnconditionalPriceDiscountOnProduct extends AbstractUnconditionalProductPromotion {
  protected applyPromotionForOneProduct(
    product: IProductWithAppliedPromotions,
  ): IProductWithAppliedPromotions {
    return {
      ...product,
      finalPrice: product.finalPrice - this.discountValue,
      appliedPromotions: [
        ...(product.appliedPromotions || []),
        this.promotionId,
      ],
    };
  }
}
