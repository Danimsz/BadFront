import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto.model'; 
@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private apiUrl = 'http://localhost:5174/CatologoProducto/Catalogo'; 

  constructor(private http: HttpClient) { }

  obtenerCatalogo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
