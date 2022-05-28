import { HttpException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Product } from '../model/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  public async findAll(): Promise<Product[] | null> {
    return await this.productModel.find().exec();
  }

  public async reduce_quantity(id: string): Promise<void> {
    const updated = await this.productModel.findById(id).exec();
    if (updated.quantity == 0) {
      throw new HttpException('can t buy this product for the moment', 400);
    } else {
      updated.quantity -= 1;
      updated.save();
    }
  }
}
