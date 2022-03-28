import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { IProductWithAppliedPromotions } from 'src/product/types/product-with-applied-promotions';
import { ICheckout } from './types/checkout';
import { StatusEnum } from './types/status';

@Injectable()
export class CheckoutService {
  constructor(private readonly dbService: DbService) {}

  static calculateReceipt(products: IProductWithAppliedPromotions[]): number {
    return products.reduce((sum, product) => {
      sum += product.finalPrice;

      return sum;
    }, 0);
  }

  async createCheckout(): Promise<string> {
    const newCheckout: ICheckout = {
      id: `${Math.random()}`.slice(2),
      status: StatusEnum.IN_PROGRESS,
      scannedProducts: [],
    };

    await this.dbService.checkouts.createCheckout(newCheckout);

    return newCheckout.id;
  }

  getCheckout(id: string): Promise<ICheckout | undefined> {
    return this.dbService.checkouts.getCheckout(id);
  }

  getAllCheckouts(): Promise<ICheckout[]> {
    return this.dbService.checkouts.getAllCheckouts();
  }

  async scan(checkoutId: string, productId: string): Promise<void> {
    await this.dbService.checkouts.addProduct(checkoutId, productId);
  }

  async remove(checkoutId: string, productId: string): Promise<void> {
    await this.dbService.checkouts.removeProduct(checkoutId, productId);
  }

  async finish(id: string): Promise<void> {
    const checkout = await this.dbService.checkouts.getCheckout(id);

    if (!checkout) {
      throw new Error(`no checkout with id ${id} found`);
    }

    checkout.status = StatusEnum.FINISHED;
  }

  async switchToPaymentStatus(id: string): Promise<void> {
    const checkout = await this.dbService.checkouts.getCheckout(id);

    if (!checkout) {
      throw new Error(`no checkout with id ${id} found`);
    }

    checkout.status = StatusEnum.PAYMENT;
  }
}
