import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eth'
})
export class EthPipe implements PipeTransform {

  transform(value: number): number {
    return 0;
  }

}
