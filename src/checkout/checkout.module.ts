import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { ProductModule } from 'src/product/product.module';
import { PromotionModule } from 'src/promotion/promotion.module';

@Module({
  imports: [AuthModule, DbModule, ProductModule, PromotionModule],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
