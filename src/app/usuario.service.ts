import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})

  export class UsuarioService {
    private apiUrl = 'http://localhost:5174/Usuario'; 
  
    constructor(private http: HttpClient) {}
  
    obtenerDatosUsuario(userId: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/VerUsuario/${userId}`);
    }
    
  }