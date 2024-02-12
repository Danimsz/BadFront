export interface Producto {
    productoID: number;
    nombre: string;
    precio: number;
    imagen: Imagen;
  }
  
  export interface Imagen {
    imagenID: number;
    imagenNombre: string;
    imagenUrl: string;
  }
  