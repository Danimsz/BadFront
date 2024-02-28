import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { toHex } from 'web3-utils';
import { DetallesProducto, Transaction, Producto } from './producto.model'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  API_URL: string = 'http://localhost:5174/';

  products: Producto[] = []; 
  dialog: HTMLDialogElement | null = null;

  title = 'BadFront';

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    this.dialog = document.querySelector('dialog');

    let request$ = this.httpClient.get(`${this.API_URL}products`);
    this.products = await lastValueFrom(request$) as Producto[]; 
    console.log(this.products);
  }

  async buyProduct(product: Producto) { 
    const account = await this.getAccount();
    let transaction = await this.post(`buy/${product.productoID}`, JSON.stringify(account)) as Transaction; 

    console.log(transaction);

    const txHash = await this.makeTransaction(transaction);
    const transactionSuccess = await this.post(`check/${transaction.id}`, JSON.stringify(txHash));

    console.log('Transacción realizada: ' + transactionSuccess);

    const transactionMessage = transactionSuccess
      ? 'Transacción realizada con éxito :D'
      : 'Transacción fallida :(';

    this.dialog!.querySelector('p')!.innerText = transactionMessage;
    this.dialog!.showModal();
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
    let request$ = this.httpClient.post(`${this.API_URL}${url}`, data, { headers });

    return await lastValueFrom(request$);
  }
}

declare global {
  interface Window {
    ethereum: any;
  }
}
