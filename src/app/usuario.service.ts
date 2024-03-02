import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

  export class UsuarioService {
    private apiUrl = 'http://localhost:5174/'; 
  
    constructor(private http: HttpClient) {}
  
    obtenerDatosUsuario(): Observable<any> {
      // Realiza una solicitud HTTP al endpoint que devuelve los datos del usuario
      return this.http.get<any>(`${this.apiUrl}/usuario`);
    }
  }