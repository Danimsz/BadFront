import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cata } from '../producto.service';
import { Producto } from '../producto.model'; // Asegúrate de importar el DTO adecuado

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {
  producto: DetallesProductoDto;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.obtenerDetallesProducto();
  }

  obtenerDetallesProducto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productoService.obtenerDetallesProducto(id)
      .subscribe(producto => this.producto = producto);
  }
}
