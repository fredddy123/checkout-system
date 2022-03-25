import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateModule } from './state/state.module';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [StateModule, DbModule, ProductModule, PromotionModule, CheckoutModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
