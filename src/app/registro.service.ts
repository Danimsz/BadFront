import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  /*private url: string = 'https://localhost:7089';

  constructor(private http: HttpClient) { }

  //Metodo para lo q quiera extraer del back
  //Si el back nos devuelve el estado 200, se redirigue la web a pagina principal
  //Si el back devuelve otro estado diferente, se redirige a register.
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.url/registro}`, user);
  }*/
}
