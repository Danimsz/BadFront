import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto.model';
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  catalogo: Producto[] = [];
  private backendUrl = 'http://localhost:5174/';

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit(): void {
    this.obtenerCatalogo();
  }

  obtenerCatalogo(): void {
    this.catalogoService.obtenerCatalogo()
      .subscribe(
        (data) => {
          this.catalogo = data;
          this.catalogo.forEach(producto => {
            if (producto.imagen) {
              producto.imagen.imagenUrl = this.backendUrl + producto.imagen.imagenUrl;
            }
          });
        },
        (error) => {
          console.error('Error al obtener el catálogo de productos', error);
        }
      );
  }
}

