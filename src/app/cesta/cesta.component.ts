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
  precioTotal: number = 0;
  productoDetalle: any;

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
            console.log(this.productosEnCesta)
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
    console.log('Producto ID:', productoId); 
    if (productoId !== undefined) {
      this.cestaService.quitarProductoCesta(productoId)
        .subscribe(
          (data) => {
            // Verifica si data tiene la propiedad 'cantidad'
            if (data && data.cantidad !== undefined) {
              // Actualiza la cantidad del producto en productosEnCesta
              const productoIndex = this.productosEnCesta.findIndex(producto => producto.ProductoID === productoId);
              if (productoIndex !== -1) {
                this.productosEnCesta[productoIndex].cantidad = data.cantidad;
    
                // Si la cantidad es 0, elimina el producto de la cesta
                if (data.cantidad === 0) {
                  this.productosEnCesta.splice(productoIndex, 1);
                }
              }
            } else {
              console.error('La respuesta del servidor no contiene la propiedad "cantidad".', data);
            }
          },
          (error) => {
            console.error('Error al quitar producto de la cesta', error);
          }
        );
    } else {
      console.error('El productoId es undefined');
    }
  }
}