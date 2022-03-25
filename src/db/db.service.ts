import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  products: IProduct[] = [
    {
      title: 'pizza',
      id: 'id1',
      externalId: 'externalId1',
      price: 10,
    },
    {
      title: 'milk',
      id: 'id2',
      externalId: 'externalId2',
      price: 20,
    },
    {
      title: 'bread',
      id: 'id3',
      externalId: 'externalId3',
      price: 30,
    },
    {
      title: 'apple',
      id: 'id4',
      externalId: 'externalId4',
      price: 40,
    },
    {
      title: 'beer',
      id: 'id5',
      externalId: 'externalId5',
      price: 50,
    },
    {
      title: 'chocolate',
      id: 'id6',
      externalId: 'externalId6',
      price: 60,
    },
    {
      title: 'sausage',
      id: 'id7',
      externalId: 'externalId7',
      price: 70,
    },
    {
      title: 'tomato',
      id: 'id8',
      externalId: 'externalId8',
      price: 80,
    },
    {
      title: 'potato',
      id: 'id9',
      externalId: 'externalId9',
      price: 90,
    },
    {
      title: 'soda',
      id: 'id10',
      externalId: 'externalId10',
      price: 100,
    },
  ];
  promotions: IPromotion[] = [
    {
      condition: PROMOTION_CONDITION.BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNTE_BY_Y_PERCENTS,
    }
  ];
  checkouts: ICheckout[] = [];

  async getAllProducts(): Promise<IProduct[]> {
    return this.products;
  }

  async getProduct(id: string): Promise<IProduct | undefined> {
    return this.products.find((product) => product.id === id);
  }

  async getAllPromotions(): Promise<IPromotion[]> {
    return this.promotions;
  }

  async getPromotion(id: string): Promise<IPromotion | undefined> {
    return this.promotions.find((product) => product.id === id);
  }

  async createPromotion(data: IPromotion) {
    this.promotions.push(data);
  }

  async deletePromotion(id: string) {
    this.promotions = this.promotions.filter(
      (promotion) => promotion.id !== id,
    );
  }

  async getCheckout(id: string): Promise<ICheckout | undefined> {
    return this.checkouts.find((checkout) => checkout.id === id);
  }

  async createCheckout(data: ICheckout) {
    this.checkouts.push(data);
  }

  async deleteCheckout(id: string) {
    this.checkouts = this.checkouts.filter((checkout) => checkout.id !== id);
  }
}
