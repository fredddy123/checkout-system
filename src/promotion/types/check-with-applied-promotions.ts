import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';

export interface IReceiptWithAppliedPromotions {
  products: IProductWithAppliedPromotions[];
  baseTotal: number;
  finalTotal: number;
  appliedPromotions: string[];
}
