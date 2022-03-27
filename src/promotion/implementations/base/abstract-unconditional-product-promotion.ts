import { IProduct } from 'src/product/types/product';
import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';
import { IPromotion } from 'src/promotion/types/promotion';
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

    if (promotion.necessaryProducts === undefined) {
      throw new Error('wrong promotion type applied for the class');
    }

    this.discountValue = promotion.dicountValue;
    this.productsIdsHashMap = arrToHashMap(promotion.necessaryProducts);
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
