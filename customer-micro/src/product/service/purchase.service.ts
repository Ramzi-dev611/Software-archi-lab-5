import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Purchase } from '../model/purchase.model';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase)
    private readonly productModel: ReturnModelType<typeof Purchase>,
  ) {}
}
