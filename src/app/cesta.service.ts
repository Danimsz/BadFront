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
      // Manejar el caso en que this.userId es null, por ejemplo, lanzar un error o devolver un observable vacío
      return throwError('userId is null');
    }
  }

  //Observable string porque el servidor nos envia un mensaje de texto (return ok("el producto se ha añadido"))
  agregarProductoCesta(productoId: number, cantidad: number): Observable<any> {
    const body = { ProductoID: productoId, Cantidad: cantidad };
    return this.http.post<string>(`${this.apiUrl}CestaProductos/${this.userId}/agregar`, body);
  }

quitarProductoCesta(productoId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}CestaProductos/${this.userId}/quitar/${productoId}`);
}

 // actualizarProductoCesta(productoId: number, cantidad: number): Observable<any> {
  //  const body = { ProductoID: productoId, Cantidad: cantidad };
  //  return this.http.put(`${this.apiUrl}CestaProductos/${this.userId}/actualizar`, body);
}


