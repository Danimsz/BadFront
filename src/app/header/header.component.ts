import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtener el rol del usuario y establecer isAdmin en función de eso
    this.authService.userRol.subscribe((rol) => {
      this.isAdmin = rol === 'Administrador';
      
      if (rol !== null) {
        localStorage.setItem('rolUsuario', rol);
      } else {
        this.isAdmin = false;
      }
    });

    // Verificar el rol del usuario al iniciar el componente
    const rolUsuario = localStorage.getItem('rolUsuario');
    if (rolUsuario !== null) {
      this.isAdmin = rolUsuario === 'Administrador';
    }
  }
}
