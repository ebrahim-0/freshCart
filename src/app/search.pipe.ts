import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], searchTerm: string): IProduct[] {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
