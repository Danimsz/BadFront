// registro.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user = {
    name: '',
    address: '',
    password: '',
    repeatPassword: '',
    staySignedIn: false
  };

}
