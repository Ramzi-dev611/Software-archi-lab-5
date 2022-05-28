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

  @MessagePattern({ cmd: 'products' })
  public async getAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.productService.findAll();
    return products;
  }

  @MessagePattern({ cmd: 'buyProduct' })
  public async buyProduct(
    @Payload() buyDetails: CreatePurchaseDto,
  ): Promise<{ message: string; purchase: Purchase }> {
    const purchase: Purchase = await this.buyService.buyProduct(buyDetails);
    return { message: 'purchase made successfully', purchase };
  }

  @MessagePattern({ cmd: 'BoughtProducts' })
  public async getAllBoughtProducts(@Payload() customer_id: string) {
    return await this.buyService.getBoughtProducts(customer_id);
  }

  @MessagePattern({ cmd: 'productSubscription' })
  public async subscribeForProductOutOfStock(
    @Payload() subscriptionDetails: CreatePurchaseDto,
  ): Promise<{ message: string }> {
    return await this.buyService.subscribeForProduct(subscriptionDetails);
  }
}
