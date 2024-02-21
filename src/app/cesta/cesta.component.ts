import { Component, OnInit } from '@angular/core';
import { CestaService } from '../cesta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {
  productosEnCesta: any[] = [];
  userId: number | null = null;
  backendUrl = 'http://localhost:5174/';

  constructor(private cestaService: CestaService, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerProductosEnCesta();
    //Obtener el id del usuario
    this.authService.getUserId().subscribe((id) => {
      this.userId = id;
    });
  }

  obtenerProductosEnCesta(): void {
    this.cestaService.verProductosCesta()
      .subscribe(
        (data) => {
          console.log('Datos recibidos del servicio:', data);
  
          // Verificar si 'data' tiene la estructura esperada
          if (Array.isArray(data)) {
            this.productosEnCesta = data;
          } else {
            console.error('La respuesta del servicio no tiene la estructura esperada:', data);
          }
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
        (data) => {
        // Actualiza la cantidad del producto en productosEnCesta
        const productoIndex = this.productosEnCesta.findIndex(producto => producto.id === productoId);
        if (productoIndex !== -1) {
          this.productosEnCesta[productoIndex].cantidad = data.cantidad;

          // Si la cantidad es 0, elimina el producto de la cesta
          if (data.cantidad === 0) {
            this.productosEnCesta = this.productosEnCesta.filter(producto => producto.id !== productoId);
          }
        }
      },
        (error) => {
          console.error('Error al quitar producto de la cesta', error);
        }
      );
  }
  
 /* actualizarProducto(productoId: number, cantidad: number): void {
    this.cestaService.actualizarProductoCesta(productoId, cantidad)
      .subscribe(
        () => {
          console.log('Cantidad de producto actualizada correctamente');
        },
        (error) => {
          console.error('Error al actualizar la cantidad del producto en la cesta', error);
        }
      );*/
}
