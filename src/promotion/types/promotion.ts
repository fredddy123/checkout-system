import { PromotionConditionEnum } from './promotion-condition';

export interface IPromotion {
  id: string;
  condition: PromotionConditionEnum;
  dicountValue: number;
  necessaryProducts?: string[];
  productsToDiscount?: string[];
  necessaryProductsQuantity?: number;
  productsToDiscountQuantity?: number;
}
