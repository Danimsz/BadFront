// registro.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa el servicio Router
import { AutenticacionService } from '../autenticacion.service';

interface RespuestaServidor {
  //stringToken: string;
  idUsuario: string;
  idCesta: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})

export class RegistroComponent {
  isLoginForm = true;
  registerDto: any = {};
  loginDto: any = {};
  apiUrl = 'http://localhost:5174/LoginRegister';
  passwordMismatchError = false;
  registrationSuccess = false;
  welcomeMessage: string = '';
  loginError: string = '';
  registerError: string = '';

  // Inyecta el servicio Router en el constructor
  constructor(private http: HttpClient, private router: Router, private autenticacion: AutenticacionService) {}

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  loginUser(loginDto: any) {
    this.http.post(`${this.apiUrl}/Login`, loginDto, { responseType: 'text' })
      .subscribe(
        (response) => {

          //Cogemos idUsuario e idCesta de response
          const idUsuarioIndice = response.indexOf('idUsuario: ') + 'idUsuario: '.length;
          const idCestaIndice = response.indexOf('idCesta: ') + 'idCesta: '.length;

          //Obtenemos id usuario y el cesta
          const idUsuario = response.substring(idUsuarioIndice, response.indexOf(' ', idUsuarioIndice));
          const idCesta = response.substring(idCestaIndice, response.indexOf(' ', idCestaIndice));

          console.log('Inicio de sesión exitoso', response);
          console.log(`idUsuario: ${idUsuario}, idCesta: ${idCesta}`);
  
          // Almacena el nombre de usuario
          const username = loginDto.userName;

          //Guardamos la informacion del usuario
          this.autenticacion.guardarDatosUsuario(idUsuario, idCesta);
          console.log("Ahora si id Usuario: "+ idUsuario +"id Cesta: "+ idCesta + "soy la mejor");
  
          // Asigna el mensaje de bienvenida
          this.welcomeMessage = `Te gustan los patos? y las zapatillas? Bienvenid@ ${username}! este es tu sitio y es peligroso.`;
  
          // Reinicia el mensaje de error
          this.loginError = '';
  
          // Después de 3 segundos, redirige a la página de inicio
          setTimeout(() => {
            this.router.navigate(['/inicio']); // Ajusta la ruta según tu configuración
          }, 5000);
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
  
          // Asigna el mensaje de error
          this.loginError = 'Echa el freno Madaleno ¿dónde vas?, revisa tus credenciales amantao.';
        }
      );
  }

  // registro.component.ts
// ...

  registerUser(registerDto: any) {
    if (registerDto.password === registerDto.repeatPassword) {
      this.passwordMismatchError = false;

      this.http.post(`${this.apiUrl}/Register`, registerDto, { responseType: 'text' })
        .subscribe(
          (response) => {
            console.log('Registro exitoso pichita', response);
            this.registrationSuccess = true;

            // Reinicia el mensaje de error
            this.registerError = '';

            // Después de un tiempo, cambiar al formulario de inicio de sesión
            setTimeout(() => {
              this.toggleForm();
            }, 3000);
          },
          (error) => {
            console.error('Error al registrar usuario', error);

            // Asigna el mensaje de error
            this.registerError = 'Error al registrarte crack, a ver si vas a estar usando un nombre que ya existe, eres deficiente?';
          }
        );
    } else {
      this.passwordMismatchError = true;
    }
  }



}
