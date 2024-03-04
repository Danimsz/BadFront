import { Component, OnInit } from '@angular/core';
import { CestaService } from '../cesta.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Transaction, Producto, Imagen, DetallesProducto } from '../producto.model';
import { lastValueFrom } from 'rxjs';
import { EthPipe } from '../eth.pipe';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.css']
})
export class ConfirmacionCompraComponent implements OnInit {
  productosEnCesta: any[] = [];
  userId: number | null = null;
  backendUrl = 'http://localhost:5174/';
  precioTotal: number = 0;
  private txHash: string | null = null;
  private clientWallet: string | null = null;
  
  constructor(private cestaService: CestaService, private authService: AuthService, private http: HttpClient, private ethPipe: EthPipe) {}
  
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
            console.log(this.productosEnCesta)
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
  async realizarPago(): Promise<void> {
    try {
    const account = await this.getAccount();
    var accString = JSON.stringify(account);
    accString = accString.replace(/['"]/g, '');
    console.log(accString)
    this.clientWallet = account;
    
    const formData = new FormData();
    formData.append('clientWallet', accString);
    formData.append('totalPrice', this.precioTotal.toString());

    let request$ = await this.http.post<Transaction>(`${this.backendUrl}Pago/buy`, formData);
    var transaction: any = await lastValueFrom(request$);
    console.log(transaction);
      const txHash = await this.makeTransaction(transaction);
      const transactionSuccess = await this.post(`Pago/check/${transaction.id}`, JSON.stringify(txHash));
  
      console.log('Transacción verificada:', transactionSuccess);
      
      if (transactionSuccess) {
        this.txHash = txHash;
        const pedidoSuccess = await this.postPedido();

        console.log('Pedido creado:', pedidoSuccess);

        const message = pedidoSuccess
          ? 'Transacción y pedido realizados con éxito :D'
          : 'Transacción realizada con éxito, pero fallo al crear el pedido :(';

        console.log(message);
        await this.limpiarCesta();
      } else {
        console.log('Transacción fallida, no se creará el pedido.');
      }

    }  catch (error: any) {
      console.error('Error al realizar el pago:', error);
  

      if (error.error && error.error.errors) {
        console.error('Detalles de validación:', error.error.errors);
      }
    }
  }
  
  private async postPedido(): Promise<any> {
    try {
        this.productosEnCesta.forEach(producto => {
          console.log('Producto:', producto);
          console.log('Producto ID:', producto.productoID)
            if (!producto.id || producto.id <= 0) {
                console.error('El ID del producto es inválido');
                return;
            }
        });

        const pedidoData = {
            ClienteID: this.userId,
            MetodoPago: 'Ethereum',
            Total: this.precioTotal,
            PrecioEuro: this.precioTotal,
            PrecioEtherium: this.ethPipe.transform(this.precioTotal),
            HashTransaccion: this.txHash,
            WalletCliente: this.clientWallet,
            FechaPedido: new Date().toISOString(),
            Productos: this.productosEnCesta.map(producto => ({
                ProductoID: producto.productoID,
                Cantidad: producto.cantidad,
                PrecioUnitario: producto.precio
            }))
        };

        console.log('Datos del pedido:', JSON.stringify(pedidoData));

        const headers = { 'Content-Type': 'application/json' };
        const request$ = this.http.post(`${this.backendUrl}Pedido/CrearPedido`, pedidoData, { headers });

        return await lastValueFrom(request$);
    } catch (error: any) {
        console.error('Error al realizar la solicitud HTTP:', error);

        if (error.error && error.error.errors) {
            console.error('Detalles de validación:', error.error.errors);
        }

        throw error;
    }
}
  
  private async getAccount(): Promise<string> {
    if (typeof window.ethereum == 'undefined') {
      throw new Error('MetaMask no está instalado');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          "eth_accounts": { account }
        }
      ]
    });

    return account;
  }

  private async limpiarCesta(): Promise<void> {
    try {
      
      if (this.userId !== null) {
        // Llamar al meetodo limpiarCesta del servicio con esto consigo borrar la cesta
        await this.cestaService.limpiarCesta(this.userId).toPromise();
        console.log('Cesta limpiada exitosamente');
      } else {
        console.error('No se puede limpiar la cesta: Usuario no identificado');
      }
    } catch (error: any) {
      console.error('Error al limpiar la cesta:', error);
    }
  }

  private async makeTransaction(transaction: Transaction): Promise<string> {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
          gas: transaction.gas,
          gasPrice: transaction.gasPrice
        }
      ]
    });

    return txHash;
  }

  private async post(url: string, data: any): Promise<any> {
    const headers = { 'Content-Type': `application/json` };
    let request$ = this.http.post(`${this.backendUrl }${url}`, data, { headers });

    return await lastValueFrom(request$);
  }
}

declare global {
  interface Window {
    ethereum: any;
  }
}