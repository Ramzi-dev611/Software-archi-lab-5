import { prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Purchase {
  @prop({ required: true, type: mongoose.Types.ObjectId })
  _id: string;

  @prop({ required: true, type: mongoose.Types.ObjectId })
  product_id: string;

  @prop({ required: true, type: mongoose.Types.ObjectId })
  customer_id: string;
}
