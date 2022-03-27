import { IProduct } from 'src/product/types/product';
import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';
import { AbstractUnconditionalProductPromotion } from './base/abstract-unconditional-product-promotion';

export class UnconditionalPercentageDiscountOnProduct extends AbstractUnconditionalProductPromotion {
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
