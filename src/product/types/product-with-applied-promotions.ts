import { IProduct } from './product';

export interface IProductWithAppliedPromotions extends IProduct {
  finalPrice: number;
  appliedPromotions: string[];
}
