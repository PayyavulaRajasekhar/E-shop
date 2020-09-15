import { NgModule } from '@angular/core';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddProductComponent,
    ViewProductsComponent,
    EditProductsComponent
  ],
  imports: [
    ProductsRoutingModule,
    SharedModule
  ],
  providers: []
})
export class ProductModule {

}
