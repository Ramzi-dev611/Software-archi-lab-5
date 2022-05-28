import { Injectable } from '@nestjs/common';
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
  ) {}

  public async buyProduct(buyDetails: CreatePurchaseDto): Promise<Purchase> {
    const { product_id } = buyDetails;
    await this.productService.reduce_quantity(product_id);
    return await this.purchaseService.save(buyDetails);
  }

  public async getBoughtProducts(customer_id: string): Promise<Product[]> {
    const purchases = this.purchaseService.findPurchasesByCustomer(customer_id);
    const productIds = (await purchases).map((purchase) => purchase.product_id);
    return (await this.productService.findAll()).filter(
      (product) => product._id in productIds,
    );
  }
}
