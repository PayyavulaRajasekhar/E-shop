import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products/product.model';
import { CartItem } from './cart-item.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseURL = 'http://localhost:8080/api';

  cartLength = 0;
  constructor(private http: HttpClient) { }

  addToCart(product: Product) {
    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    const requestBody = {
      userId: loginResponse.userId,
      productId: product._id,
      productName: product.productName,
      productDescription: product.productDescription,
      productImageURL: product.productImageURL,
      productPrice: product.productPrice,
      productQuantity: 1
    };
    return this.http.post<{error: boolean, message: string}>(`${this.baseURL}/cart/add`, requestBody);
  }

  getCartItems() {
    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    return this.http.get<
      {error: boolean, message: string, items: CartItem[], totalPrice: number}
    >(`${this.baseURL}/cart/${loginResponse.userId}`);
  }

  deleteCartItem(id) {
    return this.http.delete
    <{error: boolean, message: string, item: CartItem}>
    (`${this.baseURL}/cart/${id}`);
  }

  changeItemQuantity(id, quantity) {
    return this.http.put<{error: boolean, message: string}>(`${this.baseURL}/cart/${id}`, {quantity});
  }

  placeOrder(cart, price) {
    const userDetails = JSON.parse(localStorage.getItem('loginResponse'));
    return this.http.post<any>(`${this.baseURL}/cart/order`, {
      cart,
      totalPrice: price,
      userId: userDetails.userId
    });
  }

  getOrders() {
    const userDetails = JSON.parse(localStorage.getItem('loginResponse'));
    return this.http.get<
    {error: boolean, message: string, orders: Order[]}
    >(`${this.baseURL}/cart/orders/${userDetails.userId}`);
  }

  getCartLength() {
    const userDetails = JSON.parse(localStorage.getItem('loginResponse'));
    this.http.get<
    {error: boolean, message: string, count: number}
    >(`${this.baseURL}/cart/total/${userDetails.userId}`).subscribe(data => {
      this.cartLength = data.count;
    });
  }

  getOrder(orderId) {
    return this.http.get<
    {error: boolean, message: string, order: Order}
    >(`${this.baseURL}/cart/order/${orderId}`);
  }

}
