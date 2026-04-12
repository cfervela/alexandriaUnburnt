import { Component, OnInit, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  @Input() cartItems: CartItem[] = [];
  @Output() itemRemoved = new EventEmitter<string>();
  @Output() quantityChanged = new EventEmitter<{ isbn: string; quantity: number }>();
  @Output() cartCleared = new EventEmitter<void>();

  cartTotal: number = 0;
  procesandoPago = signal<boolean>(false);
  mensajePago = signal<string>('');
  tipoPago = signal<'exito' | 'error' | ''>('');

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.actualizarCarrito();
  }

  /**
   * Cargar los items del carrito desde el servicio
   */
  actualizarCarrito(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calcularTotal();
  }

  /**
   * Calcular el total del carrito
   */
  calcularTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  /**
   * Cambiar la cantidad de un producto con validación
   */
  cambiarCantidad(isbn: string, cantidad: number): void {
    if (cantidad > 0 && cantidad <= 999) {
      const result = this.cartService.updateQuantity(isbn, cantidad);
      if (result.success) {
        this.quantityChanged.emit({ isbn, quantity: cantidad });
        this.actualizarCarrito();
      } else {
        alert(result.message);
        this.actualizarCarrito();
      }
    }
  }

  /**
   * Eliminar un producto del carrito
   */
  eliminarDelCarrito(isbn: string): void {
    this.cartService.removeFromCart(isbn);
    this.itemRemoved.emit(isbn);
    this.actualizarCarrito();
  }

  /**
   * Vaciar todo el carrito
   */
  vaciarCarrito(): void {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      this.cartService.clearCart();
      this.cartCleared.emit();
      this.actualizarCarrito();
    }
  }

  /**
   * Obtener el subtotal de un producto
   */
  getSubtotal(item: CartItem): number {
    return item.getTotalPrice();
  }

  /**
   * Procesar el pago y actualizar stock
   */
  procesarPago(): void {
    if (this.cartItems.length === 0) {
      this.mostrarMensajePago('El carrito está vacío', 'error');
      return;
    }

    this.procesandoPago.set(true);

    this.cartService.procesarPago().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.mostrarMensajePago('¡Pago procesado exitosamente! Stock actualizado.', 'exito');
          this.actualizarCarrito();

          // Redirigir después de 2 segundos
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          this.mostrarMensajePago(response.message, 'error');
          this.procesandoPago.set(false);
        }
      },
      error: (error) => {
        this.mostrarMensajePago('Error al procesar el pago', 'error');
        this.procesandoPago.set(false);
      }
    });
  }

  /**
   * Mostrar mensaje del pago
   */
  private mostrarMensajePago(mensaje: string, tipo: 'exito' | 'error'): void {
    this.tipoPago.set(tipo);
    this.mensajePago.set(mensaje);

    if (tipo === 'exito') {
      setTimeout(() => {
        this.mensajePago.set('');
        this.tipoPago.set('');
      }, 2000);
    } else {
      setTimeout(() => {
        this.mensajePago.set('');
        this.tipoPago.set('');
      }, 3000);
    }
  }
}
