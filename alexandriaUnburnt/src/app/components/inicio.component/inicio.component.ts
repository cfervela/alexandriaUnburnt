import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-inicio.component',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  terminoBusqueda: string = '';
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error:', err),
    });
  }

  // Obtener primeros 6 libros
  getFeaturedProducts(): Product[] {
    return this.products().slice(0, 6);
  }

  categorias = [
    { id: 1, nombre: 'Classic', icono: '🎭', descripcion: 'Obras literarias clásicas' },
    { id: 2, nombre: 'Fantasy', icono: '✨', descripcion: 'Mundos mágicos y aventuras' },
    { id: 3, nombre: 'Contemporary', icono: '📖', descripcion: 'Literatura contemporánea' },
    { id: 4, nombre: 'History', icono: '📜', descripcion: 'Novelas históricas' },
    { id: 5, nombre: 'Romance', icono: '💕', descripcion: 'Historias de amor' },
    { id: 6, nombre: 'YA', icono: '🎓', descripcion: 'Young Adult' },
  ];
}
