import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  public getAllProducts() {
    return this.appService.getProducts();
  }

  @Get('boughtProducts/:customer_id')
  public getBoughtProducts(@Param() customer_id: string) {
    return this.appService.getBoughtProducts(customer_id);
  }
}
