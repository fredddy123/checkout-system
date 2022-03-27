import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly dbService: DbService,
    private readonly productService: ProductService,
  ) {}

  createCheckout(): ICheckout {
    const newCheckout: ICheckout = {
      id: `${Math.random()}`.slice(2),
      status: StatusEnum.READY,
      scannedProducts: [],
      appliedPromotions: [],
    };

    this.dbService.checkouts.createCheckout(newCheckout);

    return newCheckout;
  }

  async getCheckout(id: string): Promise<ICheckout | undefined> {
    const checkout = await this.dbService.checkouts.getCheckout(id);

    return checkout;
  }

  async getAllCheckouts(): Promise<ICheckout[]> {
    return this.dbService.checkouts.getAllCheckouts();
  }

  async scan(checkoutId: string, productId: string): Promise<any> {
    // const checkout = await this.dbService.getCheckout(checkoutId);
    // const allPromotions = await this.dbService.getAllPromotions();

    // let scannedProductsResult;

    // allPromotions.forEach((promotion) => {
    //   const promotionInstace = new promotionClasses[promotion.condition](promotion);

    //   scannedProductsResult = promotionInstace.applyPromotion(scannedProductsResult)
    // })

    this.dbService.checkouts.addProduct(checkoutId, productId);
  }
}


// const products: IProduct[] = [];

//     for (const productId of checkout.scannedProducts) {
//       const product = await this.productService.findById(productId);

//       if (!product) {
//         throw new Error(`product ${productId} not found`);
//       }

//       products.push(product);
//     }

    