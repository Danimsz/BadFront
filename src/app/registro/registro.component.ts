// registro.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  isLoginForm: boolean = true;

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  user = {
    name: '',
    email: '',
    address: '',
    password: '',
    repeatPassword: '',
    staySignedIn: false
  };

}


