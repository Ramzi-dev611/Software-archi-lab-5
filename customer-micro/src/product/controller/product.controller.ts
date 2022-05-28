import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
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

  @MessagePattern('products')
  public async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @MessagePattern('buyProduct')
  public async buyProduct(
    @Payload() buyDetails: CreatePurchaseDto,
  ): Promise<{ message: string; purchase: Purchase }> {
    const purchase: Purchase = await this.buyService.buyProduct(buyDetails);
    return { message: 'purchase made successfully', purchase };
  }

  @MessagePattern('BoughtProducts')
  public async getAllBoughtProducts(@Payload() customer_id: string) {
    return await this.buyService.getBoughtProducts(customer_id);
  }

  @MessagePattern('productSubscription')
  public async subscribeForProductOutOfStock(
    @Payload() subscriptionDetails: CreatePurchaseDto,
  ): Promise<{ message: string }> {
    return await this.buyService.subscribeForProduct(subscriptionDetails);
  }
}
