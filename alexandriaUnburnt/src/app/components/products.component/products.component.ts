import { Component, OnInit } from '@angular/core';
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

  products: Product[] = [];
  product: Product = { title: '', author: '', genre: '', publisher: '', price: 0, stock: 0, image: '', description: '' };
  editing: boolean = false;
  idEditing: number | undefined = undefined;

  constructor(private productService: ProductService) {}

  ngOnInit():void {
    this.getProducts();
  }

  // LOAD PRODUCTS
  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        console.log('Products received:', data);
        this.products = data;
      },
      error: err => console.error('Error:', err)
    });
  }

  // UPDATE OR CREATE PRODUCT
  saveProduct(): void{
    if (this.editing && this.idEditing !== undefined) {
      // WE ARE CURRENTLY EDITING
      this.productService.updateProduct(this.idEditing, this.product).subscribe(data => {
        this.getProducts();
        this.resetProductForm();
      });
    } else {
      // CREATE NEW PRODUCT
      this.productService.addProduct(this.product).subscribe(data => {
        this.getProducts();
        this.resetProductForm();
      });
    }
  }

  // FILLING OUT FORM
  edit(product: Product): void {
    this.product = { ...product };
    this.editing = true;
    this.idEditing = product.id;
  }

  // DELET PRODUCT
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
