import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DbModule } from 'src/db/db.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
