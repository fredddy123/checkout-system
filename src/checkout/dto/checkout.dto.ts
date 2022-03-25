import { ProductDTO } from './product.dto';

export class CheckoutDTO {
  readonly id: string;
  readonly status: IStatus;
  readonly scannedProducts: ProductDTO[];
  readonly appliedPromotions: IPromotion[];
}
