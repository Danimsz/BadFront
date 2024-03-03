import { Producto } from "./producto.model";

export interface Usuario{
    clienteID: number;
    userName: string;
    address: string;
    rol: string;
    email: string;
    //pedidos: Pedido[];//interfaz Pedido
}

export interface Pedido{
    fecha: any;
    productos: Producto[];//interfaz Producto(producto.model)
    Total: number;
}