import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from './model/product.model';
import { PurchaseService } from './service/purchase.service';
import { Purchase } from './model/purchase.model';
import { BuyService } from './service/buy.service';

@Module({
  imports: [TypegooseModule.forFeature([Product, Purchase])],
  providers: [ProductService, PurchaseService, BuyService],
  controllers: [ProductController],
})
export class ProductModule {}
