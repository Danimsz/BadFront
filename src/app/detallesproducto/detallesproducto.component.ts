import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Subscription } from 'rxjs';
import { CestaService } from '../cesta.service';
import { AppComponent } from '../app.component';
import { DetallesProducto } from '../producto.model';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detallesproducto.component.html',
  styleUrls: ['./detallesproducto.component.css']
})
export class DetallesproductoComponent implements OnInit {
  unsubs: Subscription | null = null;
  id: number = 0;
  mostrarMensaje: boolean = false;
  productoDetalle: any;
  cantidadProducto: number = 0;
  backendUrl = 'http://localhost:5174/';

  ngOnInit() {
    this.unsubs = this.route.params.subscribe((data) => {
      this.id = data['id'];
    });
    this.obtenerDetallesProducto(this.id);
  }

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    public appComponent: AppComponent,
    private cestaService: CestaService
  ) {}

  obtenerDetallesProducto(id: number): void {
    this.productoService.obtenerDetallesProducto(id).subscribe(
      (producto: DetallesProducto) => {
        this.productoDetalle = producto;
      },
      (error: any) => {
        console.error('Error al obtener detalles del producto', error);
      }
    );
}

  agregarAlCarrito(): void {
    const productoId = this.productoDetalle.productoID;
    const cantidadEspecifica = this.cantidadProducto;
  
    // Verifica si la cantidadEspecifica es válida antes de llamar al servicio
    if (cantidadEspecifica > 0 && cantidadEspecifica <= this.productoDetalle.cantidad) {
      // Llama al servicio para agregar el producto al carrito
      this.cestaService.agregarProductoCesta(productoId, cantidadEspecifica)
        .subscribe(
          (mensaje: string) => {
            console.log('Mensaje del servidor;', mensaje);
            this.mostrarMensaje = true;
            setTimeout(() => {
              this.mostrarMensaje = false;
            }, 3000); // para que dure 3 segundos
          },
          (error) => {
            console.error('Error al agregar producto a la cesta', error);
          }
        );
    } else {
      console.error('Cantidad no válida');
    }
  }
  
}
