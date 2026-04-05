import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  products = signal<Product[]>([]);
  product: Product = { title: '', author: '', genre: '', publisher: '', price: 0, stock: 0, image: '', description: '' };
  editing: boolean = false;
  idEditing: number | undefined = undefined;
  showModal: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit():void {
    this.getProducts();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetProductForm();
  }

  // LOAD PRODUCTS
  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: data => this.products.set(data),
      error: err => console.error('Error:', err)
    });
  }

  // UPDATE OR CREATE PRODUCT
  saveProduct(): void{
    if (this.editing && this.idEditing !== undefined) {
      this.productService.updateProduct(this.idEditing, this.product).subscribe({
        next: () => { this.getProducts(); this.closeModal(); },
        error: err => console.error(err)
      });
    } else {
      this.productService.addProduct(this.product).subscribe({
        next: () => { this.getProducts(); this.closeModal(); },
        error: err => console.error(err)
      });
    }
  }

  // FILLING OUT FORM
  edit(product: Product): void {
    this.product = { ...product };
    this.editing = true;
    this.idEditing = product.id;
    this.showModal = true;
  }

  // DELETE PRODUCT
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(data => {
      this.getProducts();
    });
  }

  // CLEAN PRODUCT FORM
  resetProductForm(): void {
    this.product = { title: '', author: '', genre: '', publisher: '', price: 0, stock: 0, image: '', description: '' };
    this.editing = false;
    this.idEditing = undefined;
  }
}
