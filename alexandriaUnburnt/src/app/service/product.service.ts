import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL);
  }

  getProduct(isbn: string): Observable<Product> {
    return this.http.get<Product[]>(`${this.apiURL}/${isbn}`).pipe(
      map(products => Array.isArray(products) ? products[0] : products)
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product);
  }

  updateProduct(isbn: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/${isbn}`, product);
  }

  deleteProduct(isbn: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${isbn}`);
  }
}
