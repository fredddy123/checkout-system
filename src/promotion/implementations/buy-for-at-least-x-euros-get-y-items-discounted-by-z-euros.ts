import { CheckoutService } from 'src/checkout/checkout.service';
import { IReceiptWithAppliedPromotions } from '../types/check-with-applied-promotions';
import { AbstractConditionalProductsPriceReceiptPromotion } from './base/abstract-conditional-products-price-receipt-promotion';

export class BuyForAtLeastXEurosGetYItemsDiscountedByZEuros extends AbstractConditionalProductsPriceReceiptPromotion {
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
        finalPrice: product.finalPrice - this.dicountValue,
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
