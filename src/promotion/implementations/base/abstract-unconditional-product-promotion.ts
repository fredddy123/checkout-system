import { arrToHashMap, ObjHashMap } from 'src/utils';
import { AbstractPromotion } from './abstract-promotion';

export abstract class AbstractUnconditionalProductPromotion extends AbstractPromotion {
  protected productsIdsHashMap: ObjHashMap;
  protected discountValue: number;

  protected abstract applyPromotionForOneProduct(
    product: IProduct,
  ): IProductWithAppliedPromotions;

  constructor(promotion: IPromotion) {
    super();

    if (promotion.productsIds === undefined) {
      throw new Error('wrong promotion type applied for the class');
    }

    this.discountValue = promotion.dicountValue;
    this.productsIdsHashMap = arrToHashMap(promotion.productsIds);
  }

  protected applyPromotion(
    products: IProductWithAppliedPromotions[],
  ): IProductWithAppliedPromotions[] {
    return products.map((product) => {
      if (!this.productsIdsHashMap[product.id]) {
        return product;
      }

      return this.applyPromotionForOneProduct(product);
    });
  }
}
