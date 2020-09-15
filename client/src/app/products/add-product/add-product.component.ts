import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  error: string;
  message: string;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    this.productService.addProduct(form.value)
    .subscribe(responseData => {
      console.log(responseData);
      form.reset();
      if (responseData.error) {
        this.error = "Server Error";
        setTimeout(() => {
          this.error = null;
        }, 5000);
      } else {
        this.message = responseData.message;
        setTimeout(() => {
          this.message = null;
        }, 5000);
      }
    });
  }

}
