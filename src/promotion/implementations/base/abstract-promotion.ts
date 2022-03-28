import { IProduct } from 'src/product/types/product';
import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';
import { IReceiptWithAppliedPromotions } from 'src/promotion/types/check-with-applied-promotions';

export abstract class AbstractPromotion {
  protected promotionId: string;

  public abstract apply(
    receiptWithAppliedPromotions: IReceiptWithAppliedPromotions,
  ): IReceiptWithAppliedPromotions;

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
