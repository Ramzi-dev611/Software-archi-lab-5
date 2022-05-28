import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('products')
  public async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @MessagePattern('buyproduct')
  public async buyProduct(@Payload() id: string) {
    this.productService.reduce_quantity(id);
  }
}
