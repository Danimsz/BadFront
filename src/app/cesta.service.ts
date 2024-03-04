import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

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

  verProductosCesta(): Observable<any[]> {
    if (this.userId !== null) {
      return this.http.get<any[]>(`${this.apiUrl}CestaProductos/${this.userId}/productos`);
    } else {
      
      return throwError('userId is null');
    }
  }
  agregarProductoCesta(productoId: number, cantidad: number): Observable<any> {
    const body = { ProductoID: productoId, Cantidad: cantidad };
    return this.http.post<string>(`${this.apiUrl}CestaProductos/${this.userId}/agregar`, body);
  }

  quitarProductoCesta(productoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}CestaProductos/${this.userId}/quitar/${productoId}`);
  }

  limpiarCesta(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}CestaProductos/${userId}/limpiar`);
  }
}


