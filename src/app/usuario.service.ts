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

    editarUsuario(userId: number, editarUsuarioDto: any): Observable<Usuario> {
      return this.http.put<any>(`${this.apiUrl}/Usuario/EditarUsuario/${userId}`, editarUsuarioDto);
    }

    obtenerTodosUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.apiUrl}/Usuario/VerUsuarios`);
    }

    editarUsuarioAdmin(userId: number, editarUsuarioDto: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/Usuario/EditarUsuarioAdmin/${userId}`, editarUsuarioDto);
    }

    eliminarUsuario(userId: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/Usuario/BorrarUsuario/${userId}`);
    }
    
  }
  