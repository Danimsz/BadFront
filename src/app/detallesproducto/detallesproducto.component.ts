import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Subscription } from 'rxjs';
import { CestaService } from '../cesta.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detallesproducto.component.html',
  styleUrls: ['./detallesproducto.component.css']
})
export class DetallesproductoComponent implements OnInit {
  unsubs: Subscription | null = null;
  id: number = 0;
  cantidadProducto = 1;

  ngOnInit() {
    this.unsubs = this.route.params.subscribe((data) => {
      this.id = data['id'];
    });
    this.obtenerDetallesProducto(this.id);
  }

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private cestaService: CestaService
  ) {}

  productoDetalle: any;
  backendUrl = 'http://localhost:5174/';

  obtenerDetallesProducto(id: number): void {
    this.productoService.obtenerDetallesProducto(id).then(producto => {
      this.productoDetalle = producto;
    });
  }

  agregarAlCarrito(): void {
      const productoId = this.productoDetalle.productoID;
      this.cestaService.agregarProductoCesta(productoId, this.cantidadProducto)
        .subscribe(
          (mensaje: string) => {
            console.log('Mensaje del servidor;', mensaje);
          },
          (error) => {
            console.error('Error al agregar producto a la cesta', error);
          }
        );
  }
}
