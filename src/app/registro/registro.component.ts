// registro.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  isLoginForm: boolean = true;
  private url: string = 'https://localhost:7089/';

  //HttpClient
  constructor(private httpClient: HttpClient) {}

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  user = {
    name: '',
    address: '',
    password: '',
    repeatPassword: '',
    staySignedIn: false
  };

  //POST 
  registerUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.url + "/registro"}`, user);
  }


}


