import { prop } from '@typegoose/typegoose';

export class Purchase {
  _id: string;

  @prop({ required: true, type: String })
  product_id: string;

  @prop({ required: true, type: String })
  customer_id: string;

  constructor(customer_id: string, product_id: string) {
    this.customer_id = customer_id;
    this.product_id = product_id;
  }
}
