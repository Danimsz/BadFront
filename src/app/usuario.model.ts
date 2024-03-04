

export interface Usuario{
    clienteID: number;
    userName: string;
    address: string;
    rol: string;
    email: string;
    editando?: boolean;
}

export interface Pedido {
    id: number;
    clienteID: number;
    metodoPago: string;
    total: number;
    estado: string;
    precioEuro: number;
    precioEtherium: number;
    hashTransaccion: string;
    walletCliente: string;
    fechaPedido: Date;
    //productos: DetallesProducto[];
  }