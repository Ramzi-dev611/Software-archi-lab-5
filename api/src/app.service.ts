import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Product } from './dto/product.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('CUSTOMERSERVICE')
    private readonly customerServiceClient: ClientProxy,
  ) {}

  public getProducts(): Observable<Product[]> {
    return this.customerServiceClient.send({ cmd: 'products' }, {});
  }
}
