import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../service/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  nombre: string = '';
  email: string = '';
  asunto: string = '';
  mensaje: string = '';
  cargando: boolean = false;

  mensajeConfirmacion = signal<string>('');
  mensajeError = signal<string>('');

  constructor(private contactoService: ContactoService) {}

  enviarFormulario() {
    // Validaciones
    if (!this.nombre.trim()) {
      this.mostrarError('Por favor ingresa tu nombre');
      return;
    }
    if (!this.email.trim()) {
      this.mostrarError('Por favor ingresa tu email');
      return;
    }
    if (!this.validarEmail(this.email)) {
      this.mostrarError('Por favor ingresa un email válido');
      return;
    }
    if (!this.asunto.trim()) {
      this.mostrarError('Por favor ingresa un asunto');
      return;
    }
    if (!this.mensaje.trim()) {
      this.mostrarError('Por favor ingresa un mensaje');
      return;
    }

    // Enviar al backend
    this.cargando = true;
    const datos = {
      nombre: this.nombre,
      correo: this.email,
      asunto: this.asunto,
      mensaje: this.mensaje
    };

    this.contactoService.enviarMensaje(datos).subscribe({
      next: (response) => {
        this.cargando = false;
        this.mensajeConfirmacion.set('¡Mensaje enviado exitosamente!');
        this.limpiarFormulario();

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          this.mensajeConfirmacion.set('');
        }, 5000);
      },
      error: (error) => {
        this.cargando = false;
        const mensajeError = error?.error?.error || 'Error al enviar el mensaje. Intenta nuevamente.';
        this.mostrarError(mensajeError);
      }
    });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.email = '';
    this.asunto = '';
    this.mensaje = '';
  }

  validarEmail(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  private mostrarError(mensaje: string) {
    this.mensajeError.set(mensaje);
    setTimeout(() => {
      this.mensajeError.set('');
    }, 5000);
  }
}
