import { CheckoutService } from 'src/checkout/checkout.service';
import { IReceiptWithAppliedPromotions } from '../types/check-with-applied-promotions';
import { AbstractConditionalProductsReceiptPromotion } from './base/abstract-conditional-products-receipt-promotion';

export class BuyAtLeastXItemsGetYItemsDiscountedToZEuros extends AbstractConditionalProductsReceiptPromotion {
  public apply(
    receiptWithAppliedPromotions: IReceiptWithAppliedPromotions,
  ): IReceiptWithAppliedPromotions {
    const products = receiptWithAppliedPromotions.products;

    const necessaryProductsFound = products.filter(
      (product) => this.necessaryProductsHashMap[product.id],
    );

    if (necessaryProductsFound.length < this.necessaryProductsQuantity) {
      return receiptWithAppliedPromotions;
    }

    let appliedPromotionsSoFar = 0;

    const productsWithAppliedPromotions = products.map((product) => {
      if (
        !this.productsToDiscountHashMap[product.id] ||
        appliedPromotionsSoFar === this.productsToDiscountQuantity
      ) {
        return product;
      }

      appliedPromotionsSoFar++;

      return {
        ...product,
        finalPrice: this.dicountValue,
        appliedPromotions: [
          ...(product.appliedPromotions || []),
          this.promotionId,
        ],
      };
    });

    const total = CheckoutService.calculateReceipt(
      productsWithAppliedPromotions,
    );

    return {
      ...receiptWithAppliedPromotions,
      products: productsWithAppliedPromotions,
      finalTotal: total,
    };
  }
}
