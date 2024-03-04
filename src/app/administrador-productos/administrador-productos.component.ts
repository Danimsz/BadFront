import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto.model';
import { CatalogoService } from '../catalogo.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-administrador-productos',
  templateUrl: './administrador-productos.component.html',
  styleUrls: ['./administrador-productos.component.css']
})
export class AdministradorProductosComponent implements OnInit {
  isAdmin: boolean = false;
  catalogo: Producto[] = [];
  backendUrl = 'http://localhost:5174/';
  filtro: string = '';

  constructor(private authService: AuthService, private catalogoService: CatalogoService, private router: Router) { }

  ngOnInit(): void {
    this.authService.userRol.subscribe((rol) => {
      this.isAdmin = rol === 'Administrador';
      if (this.isAdmin) {
        this.obtenerCatalogo();
      }
    });
  }

  obtenerCatalogo(): void {
    this.catalogoService.obtenerCatalogo().then(productos => {
      this.catalogo = productos.filter(producto => producto.nombre.includes(this.filtro));
    })
  }

  aplicarFiltro() {
    this.obtenerCatalogo();
  }

  verDetalles(id: number): void {
    this.router.navigate(['/administrador-detallesproducto', id]);
  }

  crearProducto(): void {
    this.router.navigate(['/administrador-detallesproducto']);
  }
  
}
