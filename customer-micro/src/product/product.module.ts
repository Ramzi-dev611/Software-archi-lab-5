import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from './model/product.model';
import { PurchaseService } from './service/purchase.service';
import { Purchase } from './model/purchase.model';
import { BuyService } from './service/buy.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypegooseModule.forFeature([Product, Purchase]),
    ClientsModule.register([
      {
        name: 'REDISCLIENT',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379, // to fix the value of the port
        },
      },
    ]),
  ],
  providers: [ProductService, PurchaseService, BuyService],
  controllers: [ProductController],
})
export class ProductModule {}
