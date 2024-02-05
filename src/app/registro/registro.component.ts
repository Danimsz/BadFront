// registro.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  isLoginForm = true; // Establece esto a false para mostrar el formulario de registro
  registerDto: any = {}; // Inicializar como objeto vacío
  loginDto: any = {}; // Inicializar como objeto vacío
  apiUrl = 'https://localhost:7089/LoginRegister'; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  loginUser(loginDto: any) {
    // Realiza la solicitud HTTP POST al endpoint de inicio de sesión en tu servidor
    this.http.post(`${this.apiUrl}/Login`, loginDto)
      .subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso', response);
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
        }
      );
  }

  registerUser(registerDto: any) {
    // Realiza la solicitud HTTP POST al endpoint de registro en tu servidor
    this.http.post(`${this.apiUrl}/Register`, registerDto)
      .subscribe(
        (response) => {
          console.log('Registro exitoso', response);
        },
        (error) => {
          console.error('Error al registrar usuario', error);
        }
      );
  }

  fetchData() {
    // Realiza la solicitud HTTP GET para obtener datos del servidor
    this.http.get(`${this.apiUrl}`)
      .subscribe(
        (data) => {
          console.log('Datos recibidos', data);
        },
        (error) => {
          console.error('Error al obtener datos', error);
        }
      );
  }
}
