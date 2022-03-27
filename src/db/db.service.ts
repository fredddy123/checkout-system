import { Injectable } from '@nestjs/common';
// import { PromotionConditionEnum } from 'src/promotion/types/promotion-condition';

class ProductsModel {
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

class PromotionsModel {
  promotionsRecords: IPromotion[] = [
    {
      id: '1',
      condition: PromotionConditionEnum.UNCONDITIONAL_PERCENTAGE_DISCOUNT,
      productsIds: ['id1'],
      dicountValue: 10,
    },
    // {
    //   id: '2',
    //   condition: PromotionConditionEnum.UNCONDITIONAL_PRICE_DISCOUNT,
    //   products: ['id2'],
    //   dicountValue: 5,
    // },
    // {
    //   id: '3',
    //   condition:
    //     PromotionConditionEnum.BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS,
    //   products: ['id3'],
    //   itemsToBuyQuantity: 3,
    //   itemsToGetDiscounted: 2,
    //   dicountValue: 7,
    // },
    // {
    //   id: '4',
    //   condition:
    //     PromotionConditionEnum.BUY_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS,
    //   products: ['id4'],
    //   itemsToBuyQuantity: 3,
    //   itemsToGetDiscounted: 2,
    //   dicountValue: 50,
    // },
    // {
    //   id: '5',
    //   condition:
    //     PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_EUROS,
    //   products: ['id5'],
    //   minimalTotalPice: 100,
    //   itemsToGetDiscounted: 2,
    //   dicountValue: 9,
    // },
    // {
    //   id: '6',
    //   condition:
    //     PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS,
    //   products: ['id6'],
    //   minimalTotalPice: 150,
    //   itemsToGetDiscounted: 2,
    //   dicountValue: 12,
    // },
    // {
    //   id: '7',
    //   condition:
    //     PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_EUROS,
    //   products: ['id7'],
    //   minimalTotalPice: 200,
    //   dicountValue: 25,
    // },
    // {
    //   id: '8',
    //   condition:
    //     PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_DISCOUNT_BY_Y_PERCENTS,
    //   products: ['id8'],
    //   minimalTotalPice: 250,
    //   dicountValue: 5,
    // },
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

class CheckoutsModel {
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
  products: ProductsModel = new ProductsModel();
  promotions: PromotionsModel = new PromotionsModel();
  checkouts: CheckoutsModel = new CheckoutsModel();
}
