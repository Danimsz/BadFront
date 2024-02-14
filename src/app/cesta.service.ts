import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Asegúrate de importar el servicio AuthService

@Injectable({
  providedIn: 'root',
})
export class CestaService {
  private apiUrl = 'http://localhost:5174/';
  private userId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;
    });
  }

  verProductosCesta(): Observable<any> {
    // Usa this.userId directamente para obtener el ID del usuario
    return this.http.get<any>(`${this.apiUrl}CestaProductos/${this.userId}/productos`);
  }

  agregarProductoCesta(productoId: number, cantidad: number): Observable<any> {
    // Usa this.userId directamente para obtener el ID del usuario
    const body = { ProductoID: productoId, Cantidad: cantidad };
    return this.http.post(`${this.apiUrl}CestaProductos/${this.userId}/añadir`, body);
  }

  quitarProductoCesta(productoId: number): Observable<any> {
    // Usa this.userId directamente para obtener el ID del usuario
    const body = { ProductoID: productoId };
    return this.http.delete(`${this.apiUrl}CestaProductos/${this.userId}/quitar`, { body: body });
  }
}

