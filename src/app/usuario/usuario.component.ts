import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  [x: string]: any;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerDatosUsuario().subscribe(
      (data) => {
        this.usuario = data; // Asigna los datos del usuario al objeto 'usuario'
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }
}