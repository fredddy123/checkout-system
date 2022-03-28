import { IPromotion } from 'src/promotion/types/promotion';
import { arrToHashMap, ObjHashMap } from 'src/utils';
import { AbstractPromotion } from './abstract-promotion';

export abstract class AbstractConditionalPriceReceiptPromotion extends AbstractPromotion {
  protected productsToDiscountHashMap: ObjHashMap;
  protected productsToDiscountQuantity: number;
  protected dicountValue: number;
  protected applicableTotal: number;

  constructor(promotion: IPromotion) {
    super();

    if (
      promotion.applicableTotal === undefined ||
      promotion.productsToDiscountQuantity === undefined ||
      promotion.necessaryProducts === undefined ||
      promotion.productsToDiscount === undefined
    ) {
      throw new Error('wrong promotion type applied for the class');
    }

    this.promotionId = promotion.id;
    this.applicableTotal = promotion.applicableTotal;
    this.productsToDiscountQuantity =
      promotion.productsToDiscountQuantity === -1
        ? Infinity
        : promotion.productsToDiscountQuantity;
    this.dicountValue = promotion.dicountValue;
    this.productsToDiscountHashMap = arrToHashMap(promotion.productsToDiscount);
  }
}
