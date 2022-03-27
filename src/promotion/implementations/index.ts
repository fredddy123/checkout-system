import { PromotionConditionEnum } from '../types/promotion-condition';
import { BuyXItemsGetYItemsDiscountedByZEuros } from './buy-x-items-get-y-items-discounted-by-z-euros';
import { BuyXItemsGetYItemsDiscountedByZPercents } from './buy-x-items-get-y-items-discounted-by-z-percents';
import { UnconditionalPercentageDiscountOnProduct } from './unconditional-percentage-discount-on-product';
import { UnconditionalPriceDiscount } from './unconditional-price-discount-on-product';

export type OneOfPromotionImplementationsType =
  | UnconditionalPercentageDiscountOnProduct
  | UnconditionalPriceDiscount
  | BuyXItemsGetYItemsDiscountedByZEuros
  | BuyXItemsGetYItemsDiscountedByZPercents;

export const promotionConditionToImplementationMap = {
  [PromotionConditionEnum.UNCONDITIONAL_PERCENTAGE_DISCOUNT]:
    UnconditionalPercentageDiscountOnProduct,
  [PromotionConditionEnum.UNCONDITIONAL_PRICE_DISCOUNT]:
    UnconditionalPriceDiscount,
  [PromotionConditionEnum.BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS]:
    BuyXItemsGetYItemsDiscountedByZEuros,
  [PromotionConditionEnum.BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS]:
    BuyXItemsGetYItemsDiscountedByZPercents,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS]:
    undefined,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS]:
    undefined,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_EUROS]:
    undefined,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_PERCENTS]:
    undefined,
};
