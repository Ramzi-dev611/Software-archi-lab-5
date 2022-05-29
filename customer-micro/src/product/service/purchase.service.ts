import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { Purchase } from '../model/purchase.model';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase)
    private readonly purchaseModel: ReturnModelType<typeof Purchase>,
  ) {}

  public async save(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const { customer_id, product_id } = createPurchaseDto;
    const purchase: Purchase = new Purchase(customer_id, product_id);
    const createdPurchase = new this.purchaseModel(purchase);
    return await createdPurchase.save();
  }

  public async findPurchasesByCustomer(
    customer_id: string,
  ): Promise<Purchase[]> {
    const purchases: Purchase[] = await this.purchaseModel
      .find({ customer_id })
      .exec();
    console.log(purchases);
    return purchases;
  }
}
