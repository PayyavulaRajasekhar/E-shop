import { CartItem } from './cart-item.model';

export interface Order {
  userId: string;
  cart: CartItem[];
  totalPrice: number;
  _id: string;
  status: string;
}
