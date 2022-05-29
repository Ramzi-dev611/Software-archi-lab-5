import { Controller } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { Product } from '../model/product.model';
import { Purchase } from '../model/purchase.model';
import { BuyService } from '../service/buy.service';
import { ProductService } from '../service/product.service';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly buyService: BuyService,
  ) {}

  @MessagePattern({ cmd: 'products' }, Transport.TCP)
  public async getAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.productService.findAll();
    return products;
  }

  @MessagePattern({ cmd: 'buyProduct' }, Transport.TCP)
  public async buyProduct(
    buyDetails: CreatePurchaseDto,
  ): Promise<{ message: string; purchase: Purchase }> {
    const purchase: Purchase = await this.buyService.buyProduct(buyDetails);
    return { message: 'purchase made successfully', purchase };
  }

  @MessagePattern({ cmd: 'BoughtProducts' }, Transport.TCP)
  public async getAllBoughtProducts(
    @Payload() payload: { customer_id: string },
  ) {
    return await this.buyService.getBoughtProducts(payload.customer_id);
  }

  @MessagePattern({ cmd: 'productSubscription' }, Transport.TCP)
  public async subscribeForProductOutOfStock(
    @Payload() subscriptionDetails: CreatePurchaseDto,
  ): Promise<{ message: string }> {
    return await this.buyService.subscribeForProduct(subscriptionDetails);
  }

  @EventPattern('add-new-product', Transport.REDIS)
  public async addNewProduct(@Payload() product: Product) {
    await this.productService.save(product);
  }

  @EventPattern('update-product', Transport.REDIS)
  public async updateProduct(
    @Payload() payload: { id: string; product: Product },
  ) {
    const { id, product } = payload;
    await this.productService.update(id, product);
  }
}
