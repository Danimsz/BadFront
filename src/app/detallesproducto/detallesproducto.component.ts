import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto.model';
import { CatalogoService } from '../catalogo.service';


@Component({
  selector: 'app-detallesproducto',
  templateUrl: './detallesproducto.component.html',
  styleUrls: ['./detallesproducto.component.css']
})
export class DetallesproductoComponent implements OnInit  {
  catalogo: Producto[] = [];
  constructor(private catalogoService: CatalogoService) { }

  ngOnInit(): void {
    this.obtenerCatalogo();
  }

  obtenerCatalogo(): void {
    this.catalogoService.obtenerCatalogo()
      .subscribe(
        (data) => {
          this.catalogo = data;
        },
        (error) => {
          console.error('Error al obtener el catálogo de productos', error);
        }
      );
  }
}



