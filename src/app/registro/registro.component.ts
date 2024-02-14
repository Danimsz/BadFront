import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Asegúrate de importar el servicio AuthService

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

  // Inyecta el servicio AuthService en el constructor
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  loginUser(loginDto: any) {
    this.http.post<any>(`${this.apiUrl}/Login`, loginDto)
      .subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso', response);

          // Almacena el nombre de usuario
          const username = loginDto.userName;

          // Obtén el ID del usuario y el ID de la cesta desde la respuesta del servidor
          const userId = response.userId;
          const cestaId = response.cestaId;

          // Llama al método login del AuthService para establecer el estado de autenticación y los IDs
          this.authService.login(userId, cestaId);

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

  registerUser(registerDto: any) {
    if (registerDto.password === registerDto.repeatPassword) {
      this.passwordMismatchError = false;

      this.http.post<any>(`${this.apiUrl}/Register`, registerDto)
        .subscribe(
          (response) => {
            console.log('Registro exitoso pichita', response);

            // Obtén el ID del usuario y el ID de la cesta desde la respuesta del servidor
            const userId = response.userId;
            const cestaId = response.cestaId;

            // Llama al método login del AuthService para establecer el estado de autenticación y los IDs
            this.authService.login(userId, cestaId);

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
