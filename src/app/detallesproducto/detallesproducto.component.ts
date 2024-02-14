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
    const cantidad = 1;

    this.cestaService.agregarProductoCesta(productoId, cantidad)
      .subscribe(
        () => {
          console.log('Producto añadido a la cesta correctamente');
        },
        (error) => {
          console.error('Error al agregar producto a la cesta', error);
        }
      );
  }
}
