import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../../models/product';

@Pipe({ name: 'imageFilter', standalone: true })
export class ImageFilterPipe implements PipeTransform {
  transform(products: Product[], criteria: string): Product[] {
    if (!criteria || criteria === 'all') {
      return products;
    }
    return products.filter((product: Product) => {
      return product.genre?.toLowerCase() === criteria.toLowerCase();
    });
  }
}
