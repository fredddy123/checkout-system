import { Injectable } from '@nestjs/common';
import { ICheckout } from 'src/checkout/types/checkout';
import { IProduct } from 'src/product/types/product';
import { IPromotion } from 'src/promotion/types/promotion';

class ProductsORM {
  productsRecords: IProduct[] = [];

  async getAllProducts(): Promise<IProduct[]> {
    return this.productsRecords;
  }

  async getProduct(id: string): Promise<IProduct | undefined> {
    return this.productsRecords.find((product) => product.id === id);
  }

  async addProduct(product: IProduct): Promise<void> {
    this.productsRecords.push(product);
  }
}

class PromotionsORM {
  promotionsRecords: IPromotion[] = [];

  async getAllPromotions(): Promise<IPromotion[]> {
    return this.promotionsRecords;
  }

  async getPromotion(id: string): Promise<IPromotion | undefined> {
    return this.promotionsRecords.find((product) => product.id === id);
  }

  async createPromotion(data: IPromotion) {
    this.promotionsRecords.push(data);
  }

  async deletePromotion(id: string) {
    this.promotionsRecords = this.promotionsRecords.filter(
      (promotion) => promotion.id !== id,
    );
  }
}

class CheckoutsORM {
  checkoutsRecords: ICheckout[] = [];

  async getCheckout(id: string): Promise<ICheckout | undefined> {
    return this.checkoutsRecords.find((checkout) => checkout.id === id);
  }

  async createCheckout(data: ICheckout) {
    this.checkoutsRecords.push(data);
  }

  async deleteCheckout(id: string) {
    this.checkoutsRecords = this.checkoutsRecords.filter(
      (checkout) => checkout.id !== id,
    );
  }

  async getAllCheckouts(): Promise<ICheckout[]> {
    return this.checkoutsRecords;
  }

  async addProduct(checkoutId: string, productId: string): Promise<void> {
    const checkout = this.checkoutsRecords.find((rec) => rec.id === checkoutId);

    if (!checkout) {
      throw new Error(`no checkout with id ${checkoutId} found`);
    }

    checkout.scannedProducts.push(productId);
  }

  async removeProduct(checkoutId: string, productId: string): Promise<void> {
    const checkout = this.checkoutsRecords.find((rec) => rec.id === checkoutId);

    if (!checkout) {
      throw new Error(`no checkout with id ${checkoutId} found`);
    }

    let removedOne = false;

    checkout.scannedProducts = checkout.scannedProducts.filter(
      (scannedProductId) => {
        if (scannedProductId === productId && !removedOne) {
          removedOne = true;

          return false;
        }

        return true;
      },
    );
  }
}

@Injectable()
export class DbService {
  products: ProductsORM = new ProductsORM();
  promotions: PromotionsORM = new PromotionsORM();
  checkouts: CheckoutsORM = new CheckoutsORM();
}
