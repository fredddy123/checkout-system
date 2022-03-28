import { IReceiptWithAppliedPromotions } from '../types/check-with-applied-promotions';
import { AbstractUnconditionalReceiptPromotion } from './base/abstract-unconditional-receipt-promotion';

export class UnconditionalPercentageDiscountOnReceipt extends AbstractUnconditionalReceiptPromotion {
  public apply(
    receiptWithAppliedPromotions: IReceiptWithAppliedPromotions,
  ): IReceiptWithAppliedPromotions {
    return {
      ...receiptWithAppliedPromotions,
      finalTotal:
        receiptWithAppliedPromotions.finalTotal -
        receiptWithAppliedPromotions.finalTotal * 0.01 * this.dicountValue,
      appliedPromotions: [
        ...receiptWithAppliedPromotions.appliedPromotions,
        this.promotionId,
      ],
    };
  }
}
