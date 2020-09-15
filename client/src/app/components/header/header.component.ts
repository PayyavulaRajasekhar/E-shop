import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) {
    this.cartService.getCartLength();
  }

}
