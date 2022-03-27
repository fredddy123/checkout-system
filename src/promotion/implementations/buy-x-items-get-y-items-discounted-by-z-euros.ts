import { AbstractConditionalReceiptPromotion } from './base/abstract-conditional-receipt-promotion';
import { PromotionTypes } from './base/promotion-types';

export class BuyXItemsGetYItemsDiscountedByZEuros extends AbstractConditionalReceiptPromotion {
  static type: PromotionTypes = PromotionTypes.CONDITIONAL_RECEIPT_PROMOTION;

  protected applyPromotion(
    products: IProductWithAppliedPromotions[],
  ): IProductWithAppliedPromotions[] {
    const necessaryProductsFound = products.filter(
      (product) => this.necessaryProductsHashMap[product.id],
    );

    if (necessaryProductsFound.length < this.necessaryProductsQuantity) {
      return products;
    }

    let appliedPromotionsSoFar = 0;

    return products.map((product) => {
      if (
        !this.productsToDiscountHashMap[product.id] ||
        appliedPromotionsSoFar === this.productsToDiscountQuantity
      ) {
        return product;
      }

      appliedPromotionsSoFar++;

      return {
        ...product,
        finalPrice: product.basePrice - this.dicountValue,
      };
    });
  }
}
