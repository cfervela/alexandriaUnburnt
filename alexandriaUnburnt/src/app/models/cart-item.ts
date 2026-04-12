import { Product } from './product';

export class CartItem {
  product: Product;
  quantity: number = 1;

  constructor(product: Product, quantity: number = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice(): number {
    return this.product.price * this.quantity;
  }
}
