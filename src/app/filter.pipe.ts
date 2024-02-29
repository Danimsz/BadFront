import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(catalogo: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return catalogo;
    }
    return catalogo.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}