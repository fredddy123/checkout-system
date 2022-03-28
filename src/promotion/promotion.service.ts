import { Injectable } from '@nestjs/common';
import { CheckoutService } from 'src/checkout/checkout.service';
import { DbService } from 'src/db/db.service';
import { IProduct } from 'src/product/types/product';
import {
  OneOfPromotionImplementationsType,
  promotionConditionToImplementationMap,
} from './implementations';
import { AbstractPromotion } from './implementations/base/abstract-promotion';
import { IReceiptWithAppliedPromotions } from './types/check-with-applied-promotions';
import { IPromotion } from './types/promotion';
import { PromotionConditionEnum } from './types/promotion-condition';

type PromotionNameToImplementationInstaceMap = {
  [key in PromotionConditionEnum]?: OneOfPromotionImplementationsType;
};

@Injectable()
export class PromotionService {
  private promotionsSingletons: PromotionNameToImplementationInstaceMap = {};

  constructor(private readonly dbService: DbService) {}

  getPromotionInstance(
    promotion: IPromotion,
  ): OneOfPromotionImplementationsType | null | undefined {
    if (this.promotionsSingletons[promotion.condition]) {
      return this.promotionsSingletons[promotion.condition];
    }

    const promotionClass =
      promotionConditionToImplementationMap[promotion.condition];

    if (!promotionClass) {
      return null;
    }

    this.promotionsSingletons[promotion.condition] = new promotionClass(
      promotion,
    );

    return this.promotionsSingletons[promotion.condition];
  }

  async applyPromotions(
    products: IProduct[],
  ): Promise<IReceiptWithAppliedPromotions> {
    const allPromotions = await this.dbService.promotions.getAllPromotions();

    const productsWithAppliedPromotions =
      AbstractPromotion.ensureAppliedPromotionInterfaceConsisteny(products);

    const initialCheckBaseTotal = CheckoutService.calculateReceipt(
      productsWithAppliedPromotions,
    );

    let receiptWithAppliedPromotions: IReceiptWithAppliedPromotions = {
      baseTotal: initialCheckBaseTotal,
      finalTotal: initialCheckBaseTotal,
      products:
        AbstractPromotion.ensureAppliedPromotionInterfaceConsisteny(products),
      appliedPromotions: [],
    };

    allPromotions.forEach((promotion) => {
      const promotionInstance = this.getPromotionInstance(promotion);

      if (!promotionInstance) {
        console.error(`no promotion instance found for ${promotion.id}`);
        return;
      }

      receiptWithAppliedPromotions = promotionInstance.apply(
        receiptWithAppliedPromotions,
      );
    });

    return receiptWithAppliedPromotions;
  }
}
