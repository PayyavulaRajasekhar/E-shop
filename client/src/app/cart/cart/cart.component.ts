import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: CartItem[];
  error: string;
  message: string;
  price: number;
  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.getCart();
  }

  ngOnInit(): void {
  }

  getCart() {
    this.cartService.getCartItems().subscribe(data => {
      console.log(data);
      this.cartService.getCartLength();
      this.items = data.items;
      this.price = data.totalPrice;
    });
  }

  onDelete(id) {
    this.cartService.deleteCartItem(id).subscribe(res => {
      this.getCart();
      if (res.error) {
        this.error = 'Failed to remove product from cart';
        setTimeout(() => {
          this.error = null;
        }, 5000);
      } else {
        this.message = 'Item deleted from cart';
      }
      setTimeout(() => {
        this.message = null;
      }, 2000);
    });
  }

  onQuantityChange(quantity, id) {
    this.cartService.changeItemQuantity(id, quantity).subscribe(res => {
      this.getCart();
    });
  }

  onPlaceOrder() {
    this.cartService.placeOrder(this.items, this.price).subscribe(response => {
      console.log(response);
      this.cartService.getCartLength();
      if (!response.error) {
        this.router.navigate([`/cart/orders/${response.order._id}`], {queryParams: {orderPlaced: true}});
      }
    });
  }

}
