import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Producto } from './producto.model'; 
@Injectable({
  providedIn: 'root'
})

export class CatalogoService {
  private apiUrl = 'http://localhost:5174/CatologoProducto/Catalogo'; 

  constructor(private http: HttpClient) { }

   async obtenerCatalogo(): Promise <Producto[]> {
    

    const peticion$ = this.http.get<Producto[]>(this.apiUrl);
    const productos: Producto[] = await lastValueFrom(peticion$);

    return productos;

    this.http.get<Producto[]>(this.apiUrl);
  }
}
