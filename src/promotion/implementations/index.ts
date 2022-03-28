import { PromotionConditionEnum } from '../types/promotion-condition';
import { BuyAtLeastXItemsGetYItemsDiscountedByZEuros } from './buy-at-least-x-items-get-y-items-discounted-by-z-euros';
import { BuyAtLeastXItemsGetYItemsDiscountedByZPercents } from './buy-at-least-x-items-get-y-items-discounted-by-z-percents';
import { BuyAtLeastXItemsGetYItemsDiscountedToZEuros } from './buy-at-least-x-items-get-y-items-discounted-to-z-euros';
import { BuyForAtLeastXEurosGetReceiptDiscountedByYEuros } from './buy-for-at-least-x-euros-get-receipt-discounted-by-y-euros';
import { BuyForAtLeastXEurosGetReceiptDiscountedByYPercents } from './buy-for-at-least-x-euros-get-receipt-discounted-by-y-percents';
import { BuyForAtLeastXEurosGetYItemsDiscountedByZEuros } from './buy-for-at-least-x-euros-get-y-items-discounted-by-z-euros';
import { BuyForAtLeastXEurosGetYItemsDiscountedByZPercents } from './buy-for-at-least-x-euros-get-y-items-discounted-by-z-percents';
import { BuyItemsXForAtLeastYEurosGetReceiptDiscountedByZEuros } from './buy-items-x-for-at-least-y-euros-get-receipt-discounted-by-z-euros';
import { BuyItemsXForAtLeastYEurosGetReceiptDiscountedByZPercents } from './buy-items-x-for-at-least-y-euros-get-receipt-discounted-by-z-percents';
import { UnconditionalPercentageDiscountOnProduct } from './unconditional-percentage-discount-on-product';
import { UnconditionalPercentageDiscountOnReceipt } from './unconditional-percentage-discount-on-receipt';
import { UnconditionalPriceDiscountOnProduct } from './unconditional-price-discount-on-product';

export type OneOfPromotionImplementationsType =
  | BuyAtLeastXItemsGetYItemsDiscountedByZEuros
  | BuyAtLeastXItemsGetYItemsDiscountedByZPercents
  | BuyAtLeastXItemsGetYItemsDiscountedToZEuros
  | BuyForAtLeastXEurosGetReceiptDiscountedByYEuros
  | BuyForAtLeastXEurosGetReceiptDiscountedByYPercents
  | BuyForAtLeastXEurosGetYItemsDiscountedByZEuros
  | BuyForAtLeastXEurosGetYItemsDiscountedByZPercents
  | BuyItemsXForAtLeastYEurosGetReceiptDiscountedByZEuros
  | BuyItemsXForAtLeastYEurosGetReceiptDiscountedByZPercents
  | UnconditionalPercentageDiscountOnProduct
  | UnconditionalPercentageDiscountOnReceipt
  | UnconditionalPriceDiscountOnProduct;

export const promotionConditionToImplementationMap = {
  [PromotionConditionEnum.UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_PRODUCT]:
    UnconditionalPercentageDiscountOnProduct,
  [PromotionConditionEnum.UNCONDITIONAL_PRICE_DISCOUNT_ON_PRODUCT]:
    UnconditionalPriceDiscountOnProduct,
  [PromotionConditionEnum.BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_TO_Z_EUROS]:
    BuyAtLeastXItemsGetYItemsDiscountedToZEuros,
  [PromotionConditionEnum.BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS]:
    BuyAtLeastXItemsGetYItemsDiscountedByZEuros,
  [PromotionConditionEnum.BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS]:
    BuyAtLeastXItemsGetYItemsDiscountedByZPercents,
  [PromotionConditionEnum.UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_RECEIPT]:
    UnconditionalPercentageDiscountOnReceipt,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS]:
    BuyForAtLeastXEurosGetYItemsDiscountedByZEuros,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS]:
    BuyForAtLeastXEurosGetYItemsDiscountedByZPercents,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_RECEIPT_DISCOUNTED_BY_Y_EUROS]:
    BuyForAtLeastXEurosGetReceiptDiscountedByYEuros,
  [PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_RECEIPT_DISCOUNTED_BY_Y_PERCENTS]:
    BuyForAtLeastXEurosGetReceiptDiscountedByYPercents,
  [PromotionConditionEnum.BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_RECEIPT_DISCOUNTED_BY_Z_EUROS]:
    BuyItemsXForAtLeastYEurosGetReceiptDiscountedByZEuros,
  [PromotionConditionEnum.BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_RECEIPT_DISCOUNTED_BY_Z_PERCENTS]:
    BuyItemsXForAtLeastYEurosGetReceiptDiscountedByZPercents,
};
