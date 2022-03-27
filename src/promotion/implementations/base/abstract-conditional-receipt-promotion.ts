import { arrToHashMap, ObjHashMap } from 'src/utils';
import { AbstractPromotion } from './abstract-promotion';

export abstract class AbstractConditionalReceiptPromotion extends AbstractPromotion {
  protected necessaryProductsHashMap: ObjHashMap;
  protected productsToDiscountHashMap: ObjHashMap;
  protected necessaryProductsQuantity: number;
  protected productsToDiscountQuantity: number;
  protected dicountValue: number;

  constructor(promotion: IPromotion) {
    super();

    if (
      promotion.necessaryProductsQuantity === undefined ||
      promotion.productsToDiscountQuantity === undefined ||
      promotion.necessaryProducts === undefined ||
      promotion.productsToDiscount === undefined
    ) {
      throw new Error('wrong promotion type applied for the class');
    }

    this.necessaryProductsQuantity = promotion.necessaryProductsQuantity;
    this.productsToDiscountQuantity = promotion.productsToDiscountQuantity;
    this.dicountValue = promotion.dicountValue;
    this.necessaryProductsHashMap = arrToHashMap(promotion.necessaryProducts);
    this.productsToDiscountHashMap = arrToHashMap(promotion.productsToDiscount);
  }
}
