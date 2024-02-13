import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service'; // Asegúrate de importar el servicio ProductoService
import { Subscription } from 'rxjs';

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
    })
     this.obtenerDetallesProducto(this.id);
  }
  constructor(private route: ActivatedRoute, private productoService: ProductoService) { } // Inyecta ProductoService aquí
  productoDetalle: any;
  backendUrl = 'http://localhost:5174/';


   obtenerDetallesProducto(id: number): void {
    this.productoService.obtenerDetallesProducto(id).then(producto =>{
      this.productoDetalle = producto
    })
  }
}
