import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../order.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  message: string;
  orderDetails: Order;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.route.queryParams.subscribe(data => {
      if (data.orderPlaced) {
        this.message = 'Order Placed Successfully';
      }
    });
    this.route.params.subscribe(data => {
      this.cartService.getOrder(data.id).subscribe(response => {
        this.orderDetails = response.order;
        console.log(this.orderDetails);
      });
    });
  }

  ngOnInit(): void {
  }

}
