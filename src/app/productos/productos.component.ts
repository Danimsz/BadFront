import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallesProducto, Producto } from '../producto.model';
import { CatalogoService } from '../catalogo.service';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  catalogo: Producto[] = [];
  backendUrl = 'http://localhost:5174/';
  searchTerm: string = '';
  mostrarDropdown: boolean = false;
 

  constructor(private catalogoService: CatalogoService, private productoService: ProductoService, 
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerCatalogo();
  }

  obtenerCatalogo(): void {
    this.catalogoService.obtenerCatalogo().then(productos => {
      this.catalogo = productos;
    })
  }

  selectCategory(category: string): void {
    this.searchTerm = category;
  }

  toggleDropdown() {
    this.mostrarDropdown = !this.mostrarDropdown;
  }
}
