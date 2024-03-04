import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.css']
})
export class AdministradorUsuariosComponent implements OnInit {
  isAdmin: boolean = false;
  usuarios: Usuario[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

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
        console.error('Error, no he podido obtener los usuarios crack', error);
      }
    );
  }

  editarUsuario(usuario: Usuario) {
    const nuevoEmail = prompt('Ingrese el nuevo email:');
    const nuevoRol = prompt('Ingrese el nuevo rol:');

    if (nuevoEmail !== null && nuevoRol !== null) {
      const editarUsuarioDto = { email: nuevoEmail, rol: nuevoRol };

      this.usuarioService.editarUsuarioAdmin(usuario.clienteID, editarUsuarioDto).subscribe(
        () => {
          console.log('Usuario editado exitosamente');
          this.obtenerUsuarios();
          this.router.navigate(['/administrador-usuarios']); // Navegar a la misma página actual
        },
        error => {
          console.error('Error al editar usuario', error);
        }
      );
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      
      this.usuarioService.eliminarUsuario(usuario.clienteID).subscribe(
        () => {
          console.log('Usuario eliminado exitosamente');
          this.obtenerUsuarios();
          this.router.navigate(['/administrador-usuarios']); // Navegar a la misma página actual
        },
        error => {
          console.error('Error al eliminar usuario', error);
        }
      );
    }
  }
}
