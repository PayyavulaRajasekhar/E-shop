import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsComponent } from './view-products/view-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  {
    path: 'view-products',
    component: ViewProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin"] }
  },
  {
    path: 'edit-product/:id',
    component: EditProductsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["admin"] }
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
