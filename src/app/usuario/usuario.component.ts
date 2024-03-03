import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  //usuario: boolean = false;
  usuario: any;

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = 1;
    this.datosUsuario(userId);
    /*this.authService.getUserId().subscribe(userId => {
      console.log("id usuario: ", userId);
      if (userId) {
        // Usuario autenticado, obtén y muestra los detalles del usuario
        this.datosUsuario(userId);
      } else {
        //usuario no autenticado, le redirige a la pagina login
        this.usuario = undefined;
        console.log('El usuario no ha iniciado sesion');
        this.router.navigate(['/login']);
      }
    });*/
  }
  
  datosUsuario(userId: number): void {
    this.usuarioService.obtenerDatosUsuario(userId).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
      },
      (error) => {
        console.error('Error al obtener detalles del usuario', error);
      }
    );
  }

}