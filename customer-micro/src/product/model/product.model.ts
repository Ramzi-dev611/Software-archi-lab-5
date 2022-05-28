import { prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Product {
  @prop({ type: mongoose.Types.ObjectId })
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
