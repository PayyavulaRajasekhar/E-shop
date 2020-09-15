import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], searchString: string): Product[] {
   if (searchString === undefined) {
     return products;
   } else {
    return products.filter((product, index, array) => {
      return product.productName.toLowerCase().includes(searchString.toLowerCase());
    });
   }
  }

}
