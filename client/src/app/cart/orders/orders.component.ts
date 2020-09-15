import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Order } from '../order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  panelOpenState = false;
  orders: Order[];
  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.getOrders();
  }

  getOrders() {
    this.cartService.getOrders().subscribe(OrderData => {
      this.orders = OrderData.orders;
    });
  }

  onViewMore(order: Order) {
    this.router.navigate([`/cart/orders/${order._id}`]);
  }

  ngOnInit(): void {
  }

}
