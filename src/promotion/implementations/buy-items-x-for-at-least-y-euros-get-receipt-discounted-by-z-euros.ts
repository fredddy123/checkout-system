import { CheckoutService } from 'src/checkout/checkout.service';
import { IReceiptWithAppliedPromotions } from '../types/check-with-applied-promotions';
import { AbstractConditionalProductsPriceReceiptPromotion } from './base/abstract-conditional-products-price-receipt-promotion';

export class BuyItemsXForAtLeastYEurosGetReceiptDiscountedByZEuros extends AbstractConditionalProductsPriceReceiptPromotion {
  public apply(
    receiptWithAppliedPromotions: IReceiptWithAppliedPromotions,
  ): IReceiptWithAppliedPromotions {
    const products = receiptWithAppliedPromotions.products;

    const necessaryProductsFound = products.filter(
      (product) => this.necessaryProductsHashMap[product.id],
    );

    const total = CheckoutService.calculateReceipt(necessaryProductsFound);

    if (total < this.applicableTotal) {
      return receiptWithAppliedPromotions;
    }

    return {
      ...receiptWithAppliedPromotions,
      finalTotal: receiptWithAppliedPromotions.finalTotal - this.dicountValue,
      appliedPromotions: [
        ...receiptWithAppliedPromotions.appliedPromotions,
        this.promotionId,
      ],
    };
  }
}
