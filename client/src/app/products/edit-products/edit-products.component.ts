import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  product: Product;
  message: string;
  error: string;
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.params.subscribe(data => {
      this.productService.getProduct(data.id).subscribe(response => {
        this.product = response.product;
      })
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value);
    this.productService.updateProduct(form.value).subscribe(response => {
      console.log(response);
      form.reset();
      if (response.error) {
        this.error = "Failed to update product";
        setTimeout(() => {
          this.error = null;
        }, 5000);
      } else {
        this.message = "Product Updated Successfully";
        setTimeout(() => {
          this.message = null;
        }, 5000);
      }
    });
  }

}
