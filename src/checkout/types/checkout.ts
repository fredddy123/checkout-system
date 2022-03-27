import { StatusEnum } from './status';

export interface ICheckout {
  id: string;
  status: StatusEnum;
  scannedProducts: string[];
}
