import { Product } from './product';

export interface CartLine {
  key: string;
  title: string;
  price: number;
  quantity: number;
}
