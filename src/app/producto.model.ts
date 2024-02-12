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

  export interface DetallesProducto {
    ProductoID: number;
    Cantidad: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    ImagenID?: number;
    ImagenNombre?: string;
    ImagenUrl?: string;
    Categoria: string;
  }
  