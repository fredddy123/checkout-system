interface ICheckout {
  id: string;
  status: StatusEnum;
  // scannedProducts: IProduct[];
  scannedProducts: string[];
  // appliedPromotions: IPromotion[];
  appliedPromotions: string[];
}
