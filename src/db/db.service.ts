import { Injectable } from '@nestjs/common';
import { ICheckout } from 'src/checkout/types/checkout';
import { IProduct } from 'src/product/types/product';
import { IPromotion } from 'src/promotion/types/promotion';
import { PromotionConditionEnum } from 'src/promotion/types/promotion-condition';

class ProductsORM {
  productsRecords: IProduct[] = [
    {
      title: 'pizza',
      id: 'id1',
      externalId: 'externalId1',
      basePrice: 10,
    },
    {
      title: 'milk',
      id: 'id2',
      externalId: 'externalId2',
      basePrice: 20,
    },
    {
      title: 'bread',
      id: 'id3',
      externalId: 'externalId3',
      basePrice: 30,
    },
    {
      title: 'apple',
      id: 'id4',
      externalId: 'externalId4',
      basePrice: 40,
    },
    {
      title: 'beer',
      id: 'id5',
      externalId: 'externalId5',
      basePrice: 50,
    },
    {
      title: 'chocolate',
      id: 'id6',
      externalId: 'externalId6',
      basePrice: 60,
    },
    {
      title: 'sausage',
      id: 'id7',
      externalId: 'externalId7',
      basePrice: 70,
    },
    {
      title: 'tomato',
      id: 'id8',
      externalId: 'externalId8',
      basePrice: 80,
    },
    {
      title: 'potato',
      id: 'id9',
      externalId: 'externalId9',
      basePrice: 90,
    },
    {
      title: 'soda',
      id: 'id10',
      externalId: 'externalId10',
      basePrice: 100,
    },
  ];

  async getAllProducts(): Promise<IProduct[]> {
    return this.productsRecords;
  }

  async getProduct(id: string): Promise<IProduct | undefined> {
    return this.productsRecords.find((product) => product.id === id);
  }
}

class PromotionsORM {
  promotionsRecords: IPromotion[] = [
    {
      id: '1',
      condition: PromotionConditionEnum.UNCONDITIONAL_PERCENTAGE_DISCOUNT,
      necessaryProducts: ['id1', 'id2'],
      dicountValue: 10,
    },
    {
      id: '2',
      condition: PromotionConditionEnum.UNCONDITIONAL_PRICE_DISCOUNT,
      necessaryProducts: ['id3'],
      dicountValue: 12,
    },
  ];

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
  private checkoutsRecords: ICheckout[] = [];

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
      throw new Error('no checkout found');
    }

    checkout.scannedProducts.push(productId);
  }
}

@Injectable()
export class DbService {
  products: ProductsORM = new ProductsORM();
  promotions: PromotionsORM = new PromotionsORM();
  checkouts: CheckoutsORM = new CheckoutsORM();
}
