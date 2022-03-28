import { IPromotion } from 'src/promotion/types/promotion';
import { AbstractPromotion } from './abstract-promotion';

export abstract class AbstractUnconditionalReceiptPromotion extends AbstractPromotion {
  protected dicountValue: number;

  constructor(promotion: IPromotion) {
    super();

    this.promotionId = promotion.id;
    this.dicountValue = promotion.dicountValue;
  }
}
