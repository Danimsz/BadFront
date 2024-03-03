import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from './usuario.model';
import { Pedido } from './usuario.model';

@Injectable({
  providedIn: 'root'
})

  export class UsuarioService {
    private apiUrl = 'http://localhost:5174'; 
  
    constructor(private http: HttpClient) {}
  
    obtenerDatosUsuario(userId: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/Usuario/VerUsuario/${userId}`);
    }

    obtenerPedidosUsuario(userId: number): Observable<Pedido[]> {
      return this.http.get<Pedido[]>(`${this.apiUrl}/Pedido/VerPedidos`).pipe(
        map(pedidos => pedidos.filter(pedido => pedido.clienteID === userId))
      );
    }


    
  }