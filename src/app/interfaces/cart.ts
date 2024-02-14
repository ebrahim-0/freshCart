import { IProduct } from './product';

export interface ICart {
  createdAt: string;
  items: Array<IItem>;
  totalPrice: number;
  updatedAt: string;
  userId: string;
  _id: string;
}

export interface IItem {
  asin: string;
  quantity: number;
  product: IProduct;
}
