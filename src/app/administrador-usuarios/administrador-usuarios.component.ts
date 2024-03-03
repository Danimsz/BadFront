import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.css']
})
export class AdministradorUsuariosComponent implements OnInit {
  isAdmin: boolean = false;
  usuarios: Usuario[] = [];

  constructor(private authService: AuthService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.authService.userRol.subscribe((rol) => {
      this.isAdmin = rol === 'Administrador';
    });

    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerTodosUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }
}
