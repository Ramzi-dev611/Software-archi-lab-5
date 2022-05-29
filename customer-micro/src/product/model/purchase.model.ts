import { prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Purchase {
  @prop({ required: true, type: mongoose.Types.ObjectId })
  _id: string;

  @prop({ required: true, type: String })
  product_id: string;

  @prop({ required: true, type: String })
  customer_id: string;
}
