import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // GET PRODUCTS
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL);
  }

  // CREATE NEW PRODUCT
  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiURL, product);
  }

  // UPDATE EXISTING PRODUCT
  updateProduct(isbn: string, product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiURL}/${isbn}`, product);
  }

  // DELETE EXISTING PRODUCT
  deleteProduct (isbn: string): Observable<any>{
    return this.http.delete(`${this.apiURL}/${isbn}`);
  }
}
