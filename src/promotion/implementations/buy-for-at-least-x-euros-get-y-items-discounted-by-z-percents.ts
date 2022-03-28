import { CheckoutService } from 'src/checkout/checkout.service';
import { IReceiptWithAppliedPromotions } from '../types/check-with-applied-promotions';
import { AbstractConditionalPriceReceiptPromotion } from './base/abstract-conditional-price-receipt-promotion';

export class BuyForAtLeastXEurosGetYItemsDiscountedByZPercents extends AbstractConditionalPriceReceiptPromotion {
  public apply(
    receiptWithAppliedPromotions: IReceiptWithAppliedPromotions,
  ): IReceiptWithAppliedPromotions {
    const products = receiptWithAppliedPromotions.products;

    const total = CheckoutService.calculateReceipt(products);

    if (total < this.applicableTotal) {
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
        finalPrice:
          product.finalPrice - product.finalPrice * 0.01 * this.dicountValue,
        appliedPromotions: [
          ...(product.appliedPromotions || []),
          this.promotionId,
        ],
      };
    });

    const finalTotal = CheckoutService.calculateReceipt(
      productsWithAppliedPromotions,
    );

    return {
      ...receiptWithAppliedPromotions,
      products: productsWithAppliedPromotions,
      finalTotal,
    };
  }
}
