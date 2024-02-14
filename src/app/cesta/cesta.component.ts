import { Component, OnInit } from '@angular/core';
import { CestaService } from '../cesta.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {
  productosEnCesta: any[] = [];

  constructor(private cestaService: CestaService) {}

  ngOnInit(): void {
    this.obtenerProductosEnCesta();
  }

  obtenerProductosEnCesta(): void {
    this.cestaService.verProductosCesta()
      .subscribe(
        (data) => {
          this.productosEnCesta = data;
        },
        (error) => {
          console.error('Error al obtener productos en la cesta', error);
        }
      );
  }

  agregarProducto(productoId: number, cantidad: number): void {
    this.cestaService.agregarProductoCesta(productoId, cantidad)
      .subscribe(
        () => {
          this.obtenerProductosEnCesta();
        },
        (error) => {
          console.error('Error al agregar producto a la cesta', error);
        }
      );
  }

  quitarProducto(productoId: number): void {
    this.cestaService.quitarProductoCesta(productoId)
      .subscribe(
        () => {
          this.obtenerProductosEnCesta();
        },
        (error) => {
          console.error('Error al quitar producto de la cesta', error);
        }
      );
  }
}
