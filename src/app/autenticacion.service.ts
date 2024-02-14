import { Injectable } from '@angular/core';

export interface RespuestaServidor {
  stringToken: string;
  idUsuario: string;
  idCesta: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private urlServidor = 'hhtp://localhost:5174';

  constructor() { }

  private estaAutenticado = false;
  //Inicializamos a null porq no hay nadie auntenticado al ejecutar la pag
  private usuarioId: string | null = null;

  guardarDatosUsuario(idUsuario: string, idCesta: string): void {
    localStorage.setItem('idUsuario', idUsuario);
    localStorage.setItem('idCesta', idCesta);
  }

  login(usuarioId: string){
    this.estaAutenticado = true;
    this.usuarioId = usuarioId
  }

  logout(){
    this.estaAutenticado = false;
    this.usuarioId = null
  }

  getEstaAutenticado(){
    return this.estaAutenticado;
  }

  getUsuarioId(){
    return this.usuarioId;
  }

  
}
