import { PromotionConditionEnum } from '../types/promotion-condition';

export class CreatePromotionDto {
  readonly condition: PromotionConditionEnum;
  readonly dicountValue: number;
  readonly necessaryProducts?: string[];
  readonly productsToDiscount?: string[];
  readonly necessaryProductsQuantity?: number;
  readonly productsToDiscountQuantity?: number;
  readonly applicableTotal?: number;
}
