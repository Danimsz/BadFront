import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Pedido, Usuario } from '../usuario.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  //usuario: boolean = false;
  usuario: any;
  pedidos: any;
  private userId: number | null = null;

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;
    });
    if (this.userId !== null) {
    this.datosUsuario(this.userId);
    this.datosPedidosUsuario(this.userId);
    } else {
      console.log('El usuario no ha iniciado sesion')
      this.router.navigate(['/login']);
    }
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

  datosPedidosUsuario(userId: number): void {
    this.usuarioService.obtenerPedidosUsuario(userId).subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      },
      (error) => {
        console.error('Error al obtener pedidos del usuario', error);
      }
    );
  }

  /*editarUsuario(): void {
    const 
  }*/

}