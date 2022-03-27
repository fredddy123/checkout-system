const enum PromotionConditionEnum {
  UNCONDITIONAL_PERCENTAGE_DISCOUNT = 'UNCONDITIONAL_PERCENTAGE_DISCOUNT',
  UNCONDITIONAL_PRICE_DISCOUNT = 'UNCONDITIONAL_PRICE_DISCOUNT',

  BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS = 'BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS',
  BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS = 'BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS',

  BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS',
  BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS',

  BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_EUROS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_EUROS',
  BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_PERCENTS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_PERCENTS',

  CUSTOMLY_SCRIPTED_PROMOTION = 'CUSTOMLY_SCRIPTED_PROMOTION',
}