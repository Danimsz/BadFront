import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DetallesProducto, Producto } from './producto.model'; // Asegúrate de importar el modelo Producto

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:5174/DetallesProducto'; // URL del backend para obtener detalles del producto

  constructor(private http: HttpClient) { }

  async obtenerDetallesProducto(id: number): Promise<DetallesProducto> {
    const url = `${this.apiUrl}/Producto${id}`;
    const peticion$ = this.http.get<DetallesProducto>(url);
    const productos: DetallesProducto = await lastValueFrom(peticion$);
    return productos;
  }
}
