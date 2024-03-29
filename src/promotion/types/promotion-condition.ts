export const enum PromotionConditionEnum {
  // UNCONDITIONAL_PERCENTAGE_DISCOUNT UNCONDITIONAL_PRICE_DISCOUNT
  UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_PRODUCT = 'UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_PRODUCT',
  UNCONDITIONAL_PRICE_DISCOUNT_ON_PRODUCT = 'UNCONDITIONAL_PRICE_DISCOUNT_ON_PRODUCT',

  UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_RECEIPT = 'UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_RECEIPT',
  UNCONDITIONAL_PRICE_DISCOUNT_ON_RECEIPT = 'UNCONDITIONAL_PRICE_DISCOUNT_ON_RECEIPT', // TODO: implement

  // BUY_AT_LEAST_X_ITEMS
  BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_TO_Z_EUROS = 'BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_TO_Z_EUROS',

  BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS = 'BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS',
  BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS = 'BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS',

  BUY_AT_LEAST_X_ITEMS_GET_RECEIPT_DISCOUNTED_BY_Z_EUROS = 'BUY_AT_LEAST_X_ITEMS_GET_RECEIPT_DISCOUNTED_BY_Z_EUROS', // TODO: implement
  BUY_AT_LEAST_X_ITEMS_GET_RECEIPT_DISCOUNTED_BY_Z_PERCENTS = 'BUY_AT_LEAST_X_ITEMS_GET_RECEIPT_DISCOUNTED_BY_Z_PERCENTS', // TODO: implement

  // BUY_FOR_AT_LEAST_X_EUROS
  BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS',
  BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS',

  BUY_FOR_AT_LEAST_X_EUROS_GET_RECEIPT_DISCOUNTED_BY_Y_EUROS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_RECEIPT_DISCOUNTED_BY_Y_EUROS',
  BUY_FOR_AT_LEAST_X_EUROS_GET_RECEIPT_DISCOUNTED_BY_Y_PERCENTS = 'BUY_FOR_AT_LEAST_X_EUROS_GET_RECEIPT_DISCOUNTED_BY_Y_PERCENTS',

  // BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS
  BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_RECEIPT_DISCOUNTED_BY_Z_EUROS = 'BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_RECEIPT_DISCOUNTED_BY_Z_EUROS',
  BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_RECEIPT_DISCOUNTED_BY_Z_PERCENTS = 'BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_RECEIPT_DISCOUNTED_BY_Z_PERCENTS',

  BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_Z_ITEMS_DISCOUNTED_BY_W_EUROS = 'BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_Z_ITEMS_DISCOUNTED_BY_W_EUROS', // TODO: implement
  BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_Z_ITEMS_DISCOUNTED_BY_W_PERCENTS = 'BUY_ITEMS_X_FOR_AT_LEAST_Y_EUROS_GET_Z_ITEMS_DISCOUNTED_BY_W_PERCENTS', // TODO: implement
}
