import { Component, OnInit } from '@angular/core';
import { CestaService } from '../cesta.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.css']
})
export class ConfirmacionCompraComponent implements OnInit{
  productosEnCesta: any[] = [];
  userId: number | null = null;
  backendUrl = 'http://localhost:5174/';
  precioTotal: number = 0;
  
  constructor(private cestaService: CestaService, private authService: AuthService){}
  
  ngOnInit(): void {
    this.obtenerProductosEnCesta();
    this.authService.getUserId().subscribe((id) => {
      this.userId = id;
    });
  }

  obtenerProductosEnCesta(): void {
    this.cestaService.verProductosCesta()
      .subscribe(
        (data) => {
          console.log('Datos recibidos del servicio:', data);
  
          if (Array.isArray(data)) {
            this.productosEnCesta = data;
            this.precioTotal = this.productosEnCesta.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
          } else {
            console.error('La respuesta del servicio no tiene la estructura esperada:', data);
          }
        },
        (error) => {
          console.error('Error al obtener productos en la cesta', error);
        }
      );
  }

  

  

}
