import { IProduct } from 'src/product/types/product';
import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';

export abstract class AbstractPromotion {
  protected abstract applyPromotion(
    productsWithAppliedPromotions: IProductWithAppliedPromotions[],
  ): IProductWithAppliedPromotions[];

  public apply(
    productsRawOrWithAppliedPromotions:
      | IProduct[]
      | IProductWithAppliedPromotions[],
  ): IProductWithAppliedPromotions[] {
    return this.applyPromotion(
      AbstractPromotion.ensureAppliedPromotionInterfaceConsisteny(
        productsRawOrWithAppliedPromotions,
      ),
    );
  }

  static ensureAppliedPromotionInterfaceConsisteny(
    products: IProduct[] | IProductWithAppliedPromotions[],
  ): IProductWithAppliedPromotions[] {
    return products.map((product) => {
      if (!product.finalPrice) {
        return {
          ...product,
          finalPrice: product.basePrice,
        };
      }

      return product;
    });
  }
}
