import { ProductDTO } from './product.dto';

export class CheckoutDTO {
  readonly id: string;
  readonly status: StatusEnum;
  readonly scannedProducts: ProductDTO[];
  readonly appliedPromotions: IPromotion[];
}
