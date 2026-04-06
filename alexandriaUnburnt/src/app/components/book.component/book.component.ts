import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';

@Component({
  selector: 'app-book',
  imports: [
    RouterLink
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  product = signal<Product | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit fired');

    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn') ?? '';
      console.log('ISBN:', isbn);

      this.loading.set(true);
      this.product.set(undefined);
      this.error.set(false);

      this.http.get<any>(`http://localhost:3000/products/${isbn}`).subscribe({
        next: data => {
          console.log('Response:', data);
          this.product.set(Array.isArray(data) ? data[0] : data);
          this.loading.set(false);
        },
        error: err => {
          console.error('Error:', err);
          this.loading.set(false);
          this.error.set(true);
        }
      });
    });
  }

  getImageUrl(): string {
    return `https://covers.openlibrary.org/b/isbn/${this.product()?.isbn?.trim()}-L.jpg`;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/no-cover.png';
  }

  getGenreClass(genre: string): string {
    const slug = genre?.toLowerCase().replace(/[\s\/]+/g, '-') ?? 'default';
    return `genre-${slug}`;
  }
}
