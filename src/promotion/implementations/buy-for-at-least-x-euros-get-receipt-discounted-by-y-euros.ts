import { CheckoutService } from 'src/checkout/checkout.service';
import { IReceiptWithAppliedPromotions } from '../types/check-with-applied-promotions';
import { AbstractConditionalPriceReceiptPromotion } from './base/abstract-conditional-price-receipt-promotion';

export class BuyForAtLeastXEurosGetReceiptDiscountedByYEuros extends AbstractConditionalPriceReceiptPromotion {
  public apply(
    receiptWithAppliedPromotions: IReceiptWithAppliedPromotions,
  ): IReceiptWithAppliedPromotions {
    const products = receiptWithAppliedPromotions.products;

    const total = CheckoutService.calculateReceipt(products);

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
