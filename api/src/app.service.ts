import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Product } from './dto/product.dto';
import { Purchase } from './dto/purchase.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('CUSTOMERSERVICE')
    private readonly customerServiceClient: ClientProxy,
  ) {}

  public getProducts(): Observable<Product[]> {
    return this.customerServiceClient.send({ cmd: 'products' }, {});
  }

  public getBoughtProducts(customer_id: string): Observable<Product[]> {
    return this.customerServiceClient.send(
      { cmd: 'BoughtProducts' },
      customer_id,
    );
  }

  public subscribeForProduct(
    payload: CreatePurchaseDto,
  ): Observable<{ message: string }> {
    return this.customerServiceClient.send(
      { cmd: 'productSubscription' },
      payload,
    );
  }

  public buyProducts(payload: CreatePurchaseDto): Observable<Purchase> {
    return this.customerServiceClient.send({ cmd: 'buyProduct' }, payload);
  }
}
