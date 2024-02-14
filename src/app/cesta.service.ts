import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  private url = 'http://localhost5174/Cesta';

  constructor(private http: HttpClient) { }

  
}
