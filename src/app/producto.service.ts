import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DetallesProducto } from './producto.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:5174/DetallesProducto';

  constructor(private http: HttpClient) { }

  obtenerDetallesProducto(id: number): Observable<DetallesProducto> {
    const url = `${this.apiUrl}/Producto${id}`;
    return this.http.get<DetallesProducto>(url).pipe(
      catchError(error => {
        console.error('Error al obtener los detalles del producto:', error);
        return throwError(error);
      })
    );
  }

  agregarProducto(detallesProductoDto: DetallesProducto): Observable<DetallesProducto> {
    const url = `${this.apiUrl}/AñadirProducto`;
    return this.http.post<DetallesProducto>(url, detallesProductoDto);
  }

  editarProducto(id: number, detallesProductoDto: DetallesProducto): Observable<DetallesProducto> {
    const url = `${this.apiUrl}/EditarProducto${id}`;
    return this.http.put<DetallesProducto>(url, detallesProductoDto);
  }

  eliminarProducto(id: number): Observable<{}> {
    const url = `${this.apiUrl}/EliminarProducto${id}`;
    return this.http.delete(url);
  }
}
