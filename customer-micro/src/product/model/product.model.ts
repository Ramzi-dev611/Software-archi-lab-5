import { prop } from '@typegoose/typegoose';

export class Product {
  _id: string;

  @prop({ required: true, type: String })
  public name: string;

  @prop({ required: true, type: String })
  public description: string;

  @prop({ required: true, type: Number })
  public price: number;

  @prop({ required: true, type: Number })
  public quantity: number;
}
