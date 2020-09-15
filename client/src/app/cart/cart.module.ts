import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    CartComponent,
    OrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    SharedModule,
    CartRoutingModule,
    MatExpansionModule
  ]
})
export class CartModule { }
