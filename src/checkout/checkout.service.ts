import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly dbService: DbService) {}

  createCheckout(): ICheckout {
    const newCheckout: ICheckout = {
      id: `${Math.random()}`,
      status: IStatus.READY,
      scannedProducts: [],
      appliedPromotions: [],
    };

    this.dbService.createCheckout(newCheckout);

    return newCheckout;
  }

  async getCheckout(id: string): Promise<ICheckout> {
    return this.dbService.getCheckout(id);
  }
}
