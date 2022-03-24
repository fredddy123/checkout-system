export enum Status {
  READY = 'READY',
  WAITING_FOR_ADULT_PRODUCT_APPROVE = 'WAITING_FOR_ADULT_PRODUCT_APPROVE',
  FINISHED = 'FINISHED',
}

interface Promotion {
  id: string;
  condition: string;
}

interface Product {
  id: string;
  externalId: string;
  title: string;
  basePrice: number;
  finalPrice: number;
}

export class StateDTO {
  readonly id: string;
  readonly status: Status;
  readonly scannedProducts: Product[];
  readonly appliedPromotions: Promotion[];
}
