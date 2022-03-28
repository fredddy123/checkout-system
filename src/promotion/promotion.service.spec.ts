import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from 'src/checkout/checkout.controller';
import { CheckoutModule } from 'src/checkout/checkout.module';
import { DbModule } from 'src/db/db.module';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { PromotionService } from './promotion.service';
import { PromotionConditionEnum } from './types/promotion-condition';

describe('PromotionService', () => {
  let service: PromotionService;
  let productService: ProductService;
  let checkoutController: CheckoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule, DbModule, ProductModule, CheckoutModule],
      providers: [PromotionService],
    }).compile();

    service = module.get<PromotionService>(PromotionService);
    productService = module.get<ProductService>(ProductService);
    checkoutController = module.get<CheckoutController>(CheckoutController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('real world use cases', () => {
    it('If you spend over €30, you get 10% off your purchase.', async () => {
      const productId1 = await productService.createPoduct({
        title: 'apple',
        externalId: 'externalId1',
        basePrice: 5,
      });
      const productId2 = await productService.createPoduct({
        title: 'pizza',
        externalId: 'externalId1',
        basePrice: 12,
      });
      const productId3 = await productService.createPoduct({
        title: 'bread',
        externalId: 'externalId1',
        basePrice: 10,
      });

      const promotionId1 = await service.createPromotion({
        condition:
          PromotionConditionEnum.BUY_FOR_AT_LEAST_X_EUROS_GET_RECEIPT_DISCOUNTED_BY_Y_PERCENTS,
        necessaryProducts: [productId1],
        applicableTotal: 30, // euro
        dicountValue: 10, // %
      });

      const {
        data: { id: checkoutId },
      } = await checkoutController.initiateCheckout();

      await checkoutController.scan(checkoutId, {
        productId: productId1,
      });
      await checkoutController.scan(checkoutId, {
        productId: productId2,
      });
      await checkoutController.scan(checkoutId, {
        productId: productId3,
      });
      await checkoutController.scan(checkoutId, {
        productId: productId3,
      });

      const checkoutState = await checkoutController.findOne(checkoutId);

      expect(checkoutState.data).toEqual({
        ...checkoutState.data,
        appliedPromotions: [promotionId1],
        baseTotal: 37,
        finalTotal: 33.3,
        scannedProducts: [
          {
            basePrice: 5,
            externalId: 'externalId1',
            finalPrice: 5,
            id: productId1,
            title: 'apple',
          },
          {
            basePrice: 12,
            externalId: 'externalId1',
            finalPrice: 12,
            id: productId2,
            title: 'pizza',
          },
          {
            basePrice: 10,
            externalId: 'externalId1',
            finalPrice: 10,
            id: productId3,
            title: 'bread',
          },
          {
            basePrice: 10,
            externalId: 'externalId1',
            finalPrice: 10,
            id: productId3,
            title: 'bread',
          },
        ],
      });
    });

    it('If you buy 2 or more pizzas, the price for each drops to €3.99', async () => {
      const productId1 = await productService.createPoduct({
        title: 'pizza',
        externalId: 'externalId1',
        basePrice: 5,
      });

      const promotionId1 = await service.createPromotion({
        condition:
          PromotionConditionEnum.BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_TO_Z_EUROS,
        necessaryProducts: [productId1],
        productsToDiscount: [productId1],
        necessaryProductsQuantity: 2,
        productsToDiscountQuantity: -1,
        dicountValue: 3.99,
      });

      const {
        data: { id: checkoutId },
      } = await checkoutController.initiateCheckout();

      await checkoutController.scan(checkoutId, {
        productId: productId1,
      });

      let checkoutState = await checkoutController.findOne(checkoutId);

      expect(checkoutState.data).toEqual({
        ...checkoutState.data,
        appliedPromotions: [],
        baseTotal: 5,
        finalTotal: 5,
        scannedProducts: [
          {
            basePrice: 5,
            externalId: 'externalId1',
            finalPrice: 5,
            id: productId1,
            title: 'pizza',
          },
        ],
      });

      await checkoutController.scan(checkoutId, {
        productId: productId1,
      });

      checkoutState = await checkoutController.findOne(checkoutId);

      expect(checkoutState.data).toEqual({
        ...checkoutState.data,
        baseTotal: 10,
        finalTotal: 7.98,
        scannedProducts: [
          {
            basePrice: 5,
            externalId: 'externalId1',
            finalPrice: 3.99,
            id: productId1,
            title: 'pizza',
            appliedPromotions: [promotionId1],
          },
          {
            basePrice: 5,
            externalId: 'externalId1',
            finalPrice: 3.99,
            id: productId1,
            title: 'pizza',
            appliedPromotions: [promotionId1],
          },
        ],
      });

      await checkoutController.scan(checkoutId, {
        productId: productId1,
      });

      checkoutState = await checkoutController.findOne(checkoutId);

      expect(checkoutState.data).toEqual({
        ...checkoutState.data,
        baseTotal: 15,
        finalTotal: 11.97,
        scannedProducts: [
          {
            basePrice: 5,
            externalId: 'externalId1',
            finalPrice: 3.99,
            id: productId1,
            title: 'pizza',
            appliedPromotions: [promotionId1],
          },
          {
            basePrice: 5,
            externalId: 'externalId1',
            finalPrice: 3.99,
            id: productId1,
            title: 'pizza',
            appliedPromotions: [promotionId1],
          },
          {
            basePrice: 5,
            externalId: 'externalId1',
            finalPrice: 3.99,
            id: productId1,
            title: 'pizza',
            appliedPromotions: [promotionId1],
          },
        ],
      });
    });
  });

  describe('one promotion', () => {
    it('UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_PRODUCT', async () => {
      const productId1 = await productService.createPoduct({
        title: 'apple',
        externalId: 'externalId1',
        basePrice: 10,
      });

      const promotionId1 = await service.createPromotion({
        condition:
          PromotionConditionEnum.UNCONDITIONAL_PERCENTAGE_DISCOUNT_ON_PRODUCT,
        necessaryProducts: [productId1],
        dicountValue: 15,
      });

      const {
        data: { id: checkoutId },
      } = await checkoutController.initiateCheckout();

      await checkoutController.scan(checkoutId, {
        productId: productId1,
      });

      const checkoutState = await checkoutController.findOne(checkoutId);

      expect(checkoutState.data).toEqual({
        ...checkoutState.data,
        baseTotal: 10,
        finalTotal: 8.5,
        scannedProducts: [
          {
            title: 'apple',
            id: productId1,
            externalId: 'externalId1',
            basePrice: 10,
            finalPrice: 8.5,
            appliedPromotions: [promotionId1],
          },
        ],
        appliedPromotions: [],
      });
    });

    it('BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS', async () => {
      const productId1 = await productService.createPoduct({
        title: 'apple',
        externalId: 'externalId1',
        basePrice: 10,
      });
      const productId2 = await productService.createPoduct({
        title: 'milk',
        externalId: 'externalId2',
        basePrice: 20,
      });

      const promotionId1 = await service.createPromotion({
        condition:
          PromotionConditionEnum.BUY_AT_LEAST_X_ITEMS_GET_Y_ITEMS_DISCOUNTED_BY_Z_PERCENTS,
        necessaryProducts: [productId1],
        necessaryProductsQuantity: 2,
        productsToDiscount: [productId2],
        productsToDiscountQuantity: 2,
        dicountValue: 25, // %
      });

      const {
        data: { id: checkoutId },
      } = await checkoutController.initiateCheckout();

      await checkoutController.scan(checkoutId, {
        productId: productId1,
      });
      await checkoutController.scan(checkoutId, {
        productId: productId1,
      });

      await checkoutController.scan(checkoutId, {
        productId: productId2,
      });
      await checkoutController.scan(checkoutId, {
        productId: productId2,
      });
      await checkoutController.scan(checkoutId, {
        productId: productId2,
      });

      const checkoutState = await checkoutController.findOne(checkoutId);

      expect(checkoutState.data).toEqual({
        ...checkoutState.data,
        appliedPromotions: [],
        baseTotal: 80,
        finalTotal: 70,
        scannedProducts: [
          {
            basePrice: 10,
            externalId: 'externalId1',
            finalPrice: 10,
            id: productId1,
            title: 'apple',
          },
          {
            basePrice: 10,
            externalId: 'externalId1',
            finalPrice: 10,
            id: productId1,
            title: 'apple',
          },
          {
            appliedPromotions: [promotionId1],
            basePrice: 20,
            externalId: 'externalId2',
            finalPrice: 15,
            id: productId2,
            title: 'milk',
          },
          {
            appliedPromotions: [promotionId1],
            basePrice: 20,
            externalId: 'externalId2',
            finalPrice: 15,
            id: productId2,
            title: 'milk',
          },
          {
            basePrice: 20,
            externalId: 'externalId2',
            finalPrice: 20,
            id: productId2,
            title: 'milk',
          },
        ],
      });
    });
  });
});
