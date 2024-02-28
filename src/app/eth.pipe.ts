import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eth'
})
export class EthPipe implements PipeTransform {

  transform(precio: number): number {
    const etherium = 0.00036;
    const euroAEtherium = precio * etherium;

    return Math.round(euroAEtherium * 1e4) / 1e4;
  }

}
