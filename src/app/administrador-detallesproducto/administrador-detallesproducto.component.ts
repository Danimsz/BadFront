import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductoService } from '../producto.service';
import { DetallesProducto } from '../producto.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador-detallesproducto',
  templateUrl: './administrador-detallesproducto.component.html',
  styleUrls: ['./administrador-detallesproducto.component.css']
})
export class AdministradorDetallesproductoComponent implements OnInit {
  isAdmin: boolean = false;
  unsubs: Subscription | null = null;
  id: number = 0;
  productoDetalle: any;
  backendUrl = 'http://localhost:5174/';
  editMode = false;
  confirmarEliminacion = false;
  mensaje: string = '';

  constructor(private route: ActivatedRoute, private productoService: ProductoService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.unsubs = this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.authService.userRol.subscribe((rol) => {
        this.isAdmin = rol === 'Administrador';
        if (this.isAdmin) {
          if (this.id) {
            this.obtenerDetallesProducto(this.id);
          } else {
            this.productoDetalle = {};
            this.editMode = true;
          }
        }
      });
    });
  }
  
  

  obtenerDetallesProducto(id: number): void {
    console.log('Obteniendo detalles del producto con ID:', id);
    this.productoService.obtenerDetallesProducto(id).subscribe(
      (producto: DetallesProducto) => {
        this.productoDetalle = producto;
        console.log('Detalles del producto obtenidos:', this.productoDetalle);
      },
      (error: any) => {
        console.error('Error al obtener detalles del producto', error);
      }
    );
  }  

  toggleEditMode() {
    if (this.editMode && !this.productoDetalle.productoID) {
      this.router.navigate(['/administrador-productos']);
    } else {
      this.editMode = !this.editMode;
    }
  }
  
  eliminarProducto() {
    this.confirmarEliminacion = true;
  }  

  guardarCambios() {
    if (this.productoDetalle.productoID) {
      this.productoService.editarProducto(this.productoDetalle.productoID, this.productoDetalle).subscribe(
        () => {
          console.log('Producto editado con éxito');
          this.mensaje = 'Producto editado con éxito';
          this.editMode = false;
        },
        error => {
          console.error('Error al editar el producto', error);
          this.mensaje = 'Error editando el producto';
        }
      );
    } else {
      this.productoService.agregarProducto(this.productoDetalle).subscribe(
        () => {
          console.log('Producto creado con éxito');
          this.mensaje = 'Producto creado con éxito';
          this.editMode = false;
        },
        error => {
          console.error('Error al crear el producto', error);
          this.mensaje = 'Error creando el producto';
        }
      );
    }
  }
  
  
  confirmarEliminarProducto() {
    this.productoService.eliminarProducto(this.productoDetalle.productoID).subscribe(
      () => {
        console.log('Producto eliminado con éxito');
        this.mensaje = 'Producto eliminado con éxito';
        this.router.navigate(['/administrador-productos']);
      },
      error => {
        console.error('Error al eliminar el producto', error);
        this.mensaje = 'Error eliminando el producto';
      }
    );
  }
  

}
