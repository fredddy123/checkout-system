import { IPromotion } from 'src/promotion/types/promotion';
import { arrToHashMap, ObjHashMap } from 'src/utils';
import { AbstractPromotion } from './abstract-promotion';

export abstract class AbstractConditionalProductsPriceReceiptPromotion extends AbstractPromotion {
  protected necessaryProductsHashMap: ObjHashMap;
  protected productsToDiscountHashMap: ObjHashMap;
  protected necessaryProductsQuantity: number;
  protected productsToDiscountQuantity: number;
  protected dicountValue: number;
  protected applicableTotal: number;

  constructor(promotion: IPromotion) {
    super();

    if (
      promotion.applicableTotal === undefined ||
      promotion.necessaryProductsQuantity === undefined ||
      promotion.productsToDiscountQuantity === undefined ||
      promotion.necessaryProducts === undefined ||
      promotion.productsToDiscount === undefined
    ) {
      throw new Error('wrong promotion type applied for the class');
    }

    this.promotionId = promotion.id;
    this.applicableTotal = promotion.applicableTotal;
    this.necessaryProductsQuantity = promotion.necessaryProductsQuantity;
    this.productsToDiscountQuantity =
      promotion.productsToDiscountQuantity === -1
        ? Infinity
        : promotion.productsToDiscountQuantity;
    this.dicountValue = promotion.dicountValue;
    this.necessaryProductsHashMap = arrToHashMap(promotion.necessaryProducts);
    this.productsToDiscountHashMap = arrToHashMap(promotion.productsToDiscount);
  }
}
