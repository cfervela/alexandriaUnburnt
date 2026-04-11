import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../../service/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  form: FormGroup;
  cargando: boolean = false;

  mensajeConfirmacion = signal<string>('');
  mensajeError = signal<string>('');

  constructor(private contactoService: ContactoService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  enviarFormulario() {
    if (!this.form.valid) {
      this.mostrarError('Por favor completa todos los campos correctamente');
      return;
    }

    this.cargando = true;
    const datos = {
      nombre: this.form.get('nombre')?.value,
      correo: this.form.get('email')?.value,
      asunto: this.form.get('asunto')?.value,
      mensaje: this.form.get('mensaje')?.value
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
    this.form.reset();
  }

  private mostrarError(mensaje: string) {
    this.mensajeError.set(mensaje);
    setTimeout(() => {
      this.mensajeError.set('');
    }, 5000);
  }
}
