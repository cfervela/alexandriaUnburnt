import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'alexandria_carrito';

  // Signal para almacenar los items del carrito
  cartItems = signal<CartItem[]>([]);

  // Computed para calcular el total de items
  cartItemCount = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  // Computed para calcular el precio total
  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.getTotalPrice(), 0);
  });

  constructor(private http: HttpClient) {
    this.cargarCarritoDelStorage();
  }

  /**
   * Cargar el carrito desde localStorage
   */
  private cargarCarritoDelStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        const items = data.map((item: any) => {
          const product = new Product();
          Object.assign(product, item.product);
          return new CartItem(product, item.quantity);
        });
        this.cartItems.set(items);
      }
    } catch (error) {
      console.error('Error cargando carrito del storage:', error);
      this.cartItems.set([]);
    }
  }

  /**
   * Guardar el carrito en localStorage
   */
  private guardarCarritoEnStorage(): void {
    try {
      const items = this.cartItems();
      const data = items.map(item => ({
        product: item.product,
        quantity: item.quantity
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error guardando carrito en storage:', error);
    }
  }

  /**
   * Validar si se puede agregar la cantidad especificada al carrito
   * @returns objeto con {canAdd: boolean, message: string}
   */
  canAddToCart(product: Product, quantity: number = 1): { canAdd: boolean; message: string } {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.isbn === product.isbn);

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const totalQuantity = currentQuantity + quantity;

    if (totalQuantity > product.stock) {
      return {
        canAdd: false,
        message: `Solo hay ${product.stock} unidades disponibles. ${existingItem ? `Ya tienes ${currentQuantity} en el carrito.` : ''}`
      };
    }

    return { canAdd: true, message: '' };
  }

  /**
   * Agregar un producto al carrito
   * Si ya existe, incrementar la cantidad
   */
  addToCart(product: Product, quantity: number = 1): { success: boolean; message: string } {
    // Validar stock primero
    const validation = this.canAddToCart(product, quantity);
    if (!validation.canAdd) {
      return { success: false, message: validation.message };
    }

    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.isbn === product.isbn);

    if (existingItem) {
      // Si el producto ya existe, incrementar cantidad
      existingItem.quantity += quantity;
      this.cartItems.set([...currentItems]);
    } else {
      // Si es nuevo, agregarlo
      const newItem = new CartItem(product, quantity);
      this.cartItems.set([...currentItems, newItem]);
    }

    // Guardar en localStorage
    this.guardarCarritoEnStorage();
    return { success: true, message: `${product.title} añadido al carrito` };
  }

  /**
   * Eliminar un producto del carrito
   */
  removeFromCart(isbn: string): void {
    const filtered = this.cartItems().filter(item => item.product.isbn !== isbn);
    this.cartItems.set(filtered);

    // Guardar en localStorage
    this.guardarCarritoEnStorage();
  }

  /**
   * Actualizar la cantidad de un producto con validación de stock
   */
  updateQuantity(isbn: string, quantity: number): { success: boolean; message: string } {
    const currentItems = this.cartItems();
    const item = currentItems.find(item => item.product.isbn === isbn);

    if (!item) {
      return { success: false, message: 'Producto no encontrado' };
    }

    // Validar que la nueva cantidad no exceda el stock
    if (quantity > item.product.stock) {
      return {
        success: false,
        message: `Stock insuficiente. Solo hay ${item.product.stock} unidades disponibles.`
      };
    }

    if (quantity > 0) {
      item.quantity = quantity;
      this.cartItems.set([...currentItems]);
    } else {
      this.removeFromCart(isbn);
      this.guardarCarritoEnStorage();
      return { success: true, message: 'Producto eliminado' };
    }

    // Guardar en localStorage
    this.guardarCarritoEnStorage();
    return { success: true, message: 'Cantidad actualizada' };
  }

  /**
   * Limpiar el carrito
   */
  clearCart(): void {
    this.cartItems.set([]);

    // Guardar en localStorage
    this.guardarCarritoEnStorage();
  }

  /**
   * Obtener los items del carrito
   */
  getCartItems(): CartItem[] {
    return this.cartItems();
  }

  /**
   * Procesar el pago y actualizar el stock
   * Reduce el stock en la BD y limpia el carrito en caso de éxito
   */
  procesarPago(): Observable<any> {
    const items = this.cartItems();

    // Preparar datos de venta para actualizar stock
    const ventaData = items.map(item => ({
      isbn: item.product.isbn,
      quantity: item.quantity
    }));

    console.log('Iniciando procesarPago con items:', ventaData);

    // Llamar al backend para procesar la venta
    return this.http.post('http://localhost:3000/ventas', { items: ventaData }).pipe(
      tap((response: any) => {
        console.log('Respuesta éxito:', response);
        // Si es exitoso, limpiar el carrito
        this.clearCart();
      }),
      catchError((error) => {
        console.log('Error en solicitud:', error);
        const errorMessage = error.error?.message || 'Error al procesar el pago';
        return of({ success: false, message: errorMessage });
      })
    );
  }
}
