import {
  HttpException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
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

  public async findAllByIds(ids: string[]): Promise<Product[] | null> {
    return await this.productModel.find({ _id: { $in: ids } }).exec();
  }

  public async reduce_quantity(id: string): Promise<Product> {
    const updated = await this.productModel.findById(id).exec();
    if (updated === null) {
      throw new NotFoundException('product not found');
    }
    if (updated.quantity == 0) {
      throw new MethodNotAllowedException(
        'can t buy this product for the moment',
      );
    } else {
      updated.quantity -= 1;
      return await updated.save();
    }
  }

  public async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (product == null) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  public async save(newProduct: Product): Promise<Product> {
    const response = new this.productModel(newProduct);
    return await response.save();
  }

  public async update(id: string, product: Product): Promise<Product> {
    const response = await this.productModel.findById(id).exec();
    response.name = product.name != null && product.name;
    response.description = product.description != null && product.description;
    response.price = product.price != null && product.price;
    response.quantity = product.quantity != null && product.quantity;

    return await response.save();
  }
}
