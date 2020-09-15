import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  search;
  todaysDate = new Date();
  message: string;
  error: string;
  isLoading = false;
  constructor(
    public productService: ProductService,
    private router: Router,
    public authService: AuthService,
    private cartService: CartService
    ) {
    this.productService.getProducts();
  }

  ngOnInit(): void {
  }

  onDelete(productId: number) {
    this.productService.deleteProducts(productId).subscribe(responseData => {
      console.log(responseData);
      this.productService.getProducts();
      if (!responseData.error) {
        this.message = 'Product Deleted Successfully';
      }
    });
  }

  onEdit(product: Product) {
    this.router.navigate([`/products/edit-product/${product._id}`]);
  }

  onAddToCart(product: Product) {
    this.isLoading = true;
    this.cartService.addToCart(product).subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.cartService.getCartLength();
      if (response.error) {
        this.error = response.message;
        setTimeout(() => {
          this.error = null;
        }, 5000);
      } else {
        this.message = 'Product added to cart successfully';
        setTimeout(() => {
          this.message = null;
        }, 2000);
      }
    });
  }

  searchProducts() {
    console.log('started search');
    this.productService.searchProducts(this.search);
  }

}
