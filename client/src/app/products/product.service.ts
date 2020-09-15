import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8080/api';

  products: Product[];

  constructor(private http: HttpClient) { }

  addProduct(productData) {
    return this.http.post<
    {error: boolean, message: string, product: Product}
    >(this.baseURL + '/products', productData);
  }

  getProducts() {
    this.http.get<
    {error: boolean, message: string, products: Product[]}
    >(this.baseURL + '/products')
    .subscribe(productData => {
      this.products = productData.products;
      console.log('productData', productData);
    });
  }

  getProduct(id) {
    return this.http.get<{
      message: string, error: boolean, product: Product
    }>(`${this.baseURL}/products/${id}`);
  }

  deleteProducts(productId: number) {
    return this.http.delete<
    {error: boolean, message: string, products: Product[]}
    >(`${this.baseURL}/products/${productId}`);
  }

  searchProducts(searchString: string) {
    this.http.post<
    {error: boolean, errorData?: any, products?: Product[]}
    >(`${this.baseURL}/products/search`, {search: searchString})
    .subscribe(data => {
      this.products = data.products;
    });
  }

  updateProduct(product: Product) {
    return this.http.put<
    {error: boolean, message: string, response: Product}
    >(`${this.baseURL}/products/${product._id}`, product);
  }

}
