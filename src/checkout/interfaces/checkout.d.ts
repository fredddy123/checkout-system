interface ICheckout {
  id: string;
  status: IStatus;
  scannedProducts: IProduct[];
  appliedPromotions: IPromotion[];
}
