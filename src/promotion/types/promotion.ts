interface IPromotion {
  id: string;
  condition: PromotionConditionEnum;
  dicountValue: number;
  productsIds?: string[];
  necessaryProducts?: string[];
  productsToDiscount?: string[];
  necessaryProductsQuantity?: number;
  productsToDiscountQuantity?: number;
}

interface IUnconditionalProductPromotion extends IPromotion {
  productsIds: string[];
}

interface IReceiptPromotion extends IPromotion {
  necessaryProducts: string[];
  productsToDiscount: string[];
  necessaryProductsQuantity: number;
  productsToDiscountQuantity: number;
}
