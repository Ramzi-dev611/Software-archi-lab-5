import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { Product } from '../model/product.model';
import { Purchase } from '../model/purchase.model';
import { ProductService } from './product.service';
import { PurchaseService } from './purchase.service';

@Injectable()
export class BuyService {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly productService: ProductService,
    @Inject('REDISCLIENT') private readonly redisClient: ClientProxy,
  ) {}

  public async buyProduct(buyDetails: CreatePurchaseDto): Promise<Purchase> {
    const { product_id } = buyDetails;
    console.log(product_id);
    await this.productService.reduce_quantity(product_id);
    this.redisClient.emit('buyProduct', buyDetails);
    return await this.purchaseService.save(buyDetails);
  }

  public async getBoughtProducts(customer_id: string): Promise<Product[]> {
    const purchases = await this.purchaseService.findPurchasesByCustomer(
      customer_id,
    );
    const productIds = purchases.map((purchase) => purchase.product_id);
    return await this.productService.findAllByIds(productIds);
  }

  public async subscribeForProduct(
    subscriptionDetails: CreatePurchaseDto,
  ): Promise<{ message: string }> {
    const { product_id } = subscriptionDetails;
    const product: Product = await this.productService.findById(product_id);
    if (product.quantity > 0) {
      throw new MethodNotAllowedException(
        'can t subscribe for this product for the moment',
      );
    }
    this.redisClient.emit('subscription', subscriptionDetails);
    return {
      message:
        'subscription made successfully, wait for an email once the product is back in stock',
    };
  }
}
