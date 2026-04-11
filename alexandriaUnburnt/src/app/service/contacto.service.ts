import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:3000/contacto';

  constructor(private http: HttpClient) { }

  // Enviar mensaje de contacto
  enviarMensaje(datos: { nombre: string; correo: string; asunto: string; mensaje: string }): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  // Obtener todos los mensajes
  obtenerMensajes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener un mensaje por ID
  obtenerMensajePorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Eliminar un mensaje
  eliminarMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
