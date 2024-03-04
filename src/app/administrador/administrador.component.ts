import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtener el rol del usuario y establecer isAdmin en función de eso
    this.authService.userRol.subscribe((rol) => {
      this.isAdmin = rol === 'Administrador';
      // Actualizar el rol del usuario en localStorage si no es nulo
      if (rol !== null) {
        localStorage.setItem('rolUsuario', rol);
      }
    });

    // Verificar el rol del usuario al iniciar el componente
    const rolUsuario = localStorage.getItem('rolUsuario');
    if (rolUsuario !== null) {
      this.isAdmin = rolUsuario === 'Administrador';
    }
  }
}
