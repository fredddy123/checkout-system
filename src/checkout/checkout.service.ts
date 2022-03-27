import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ICheckout } from './types/checkout';
import { StatusEnum } from './types/status';

@Injectable()
export class CheckoutService {
  constructor(private readonly dbService: DbService) {}

  async createCheckout(): Promise<ICheckout> {
    const newCheckout: ICheckout = {
      id: `${Math.random()}`.slice(2),
      status: StatusEnum.IN_PROGRESS,
      scannedProducts: [],
    };

    await this.dbService.checkouts.createCheckout(newCheckout);

    return newCheckout;
  }

  getCheckout(id: string): Promise<ICheckout | undefined> {
    return this.dbService.checkouts.getCheckout(id);
  }

  getAllCheckouts(): Promise<ICheckout[]> {
    return this.dbService.checkouts.getAllCheckouts();
  }

  async scan(checkoutId: string, productId: string): Promise<any> {
    await this.dbService.checkouts.addProduct(checkoutId, productId);
  }
}
