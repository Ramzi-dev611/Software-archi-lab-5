import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from './model/product.model';
import { PurchaseService } from './service/purchase.service';
import { Purchase } from './model/purchase.model';

@Module({
  imports: [TypegooseModule.forFeature([Product, Purchase])],
  providers: [ProductService, PurchaseService],
  controllers: [ProductController],
})
export class ProductModule {}
