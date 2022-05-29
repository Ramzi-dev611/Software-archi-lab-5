import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

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

  @Post('buyProduct')
  public buyProducts(@Body() payload: CreatePurchaseDto) {
    return this.appService.buyProducts(payload);
  }

  @Post('product/subscribe')
  public subscribeForProduct(@Body() payload: CreatePurchaseDto) {
    return this.appService.subscribeForProduct(payload);
  }
}
