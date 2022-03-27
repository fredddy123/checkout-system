import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {
  OneOfPromotionImplementationsType,
  promotionConditionToImplementationMap,
} from './implementations';
import { AbstractPromotion } from './implementations/base/abstract-promotion';

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
  ): Promise<IProductWithAppliedPromotions[]> {
    const allPromotions = await this.dbService.promotions.getAllPromotions();

    let productsWithAppliedPromotions =
      AbstractPromotion.ensureAppliedPromotionInterfaceConsisteny(products);

    allPromotions.forEach((promotion) => {
      const promotionInstance = this.getPromotionInstance(promotion);

      if (!promotionInstance) {
        console.error(`no promotion instance found for ${promotion.id}`);
        return;
      }

      productsWithAppliedPromotions = promotionInstance.apply(
        productsWithAppliedPromotions,
      );
    });

    return productsWithAppliedPromotions;
  }
}
