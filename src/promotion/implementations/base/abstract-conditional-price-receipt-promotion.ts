import { IPromotion } from 'src/promotion/types/promotion';
import { AbstractPromotion } from './abstract-promotion';

export abstract class AbstractConditionalPriceReceiptPromotion extends AbstractPromotion {
  protected dicountValue: number;
  protected applicableTotal: number;

  constructor(promotion: IPromotion) {
    super();

    if (promotion.applicableTotal === undefined) {
      throw new Error('wrong promotion type applied for the class');
    }

    this.promotionId = promotion.id;
    this.applicableTotal = promotion.applicableTotal;
    this.dicountValue = promotion.dicountValue;
  }
}
