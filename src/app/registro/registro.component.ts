import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

          this.authService.login(userId, cestaId);
          this.welcomeMessage = `Te gustan los patos? y las zapatillas? Bienvenid@ ${username}! este es tu sitio y es peligroso.`;
          this.authService.userRol = response.rol;
          this.loginError = '';
          setTimeout(() => {
            this.router.navigate(['/inicio']); 
          }, 1000);
        },
        (error) => {
          console.error('Error al iniciar sesión', error);

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
            console.log('Registro exitoso', response);
            this.registrationSuccess = true;
            this.registerError = '';

            setTimeout(() => {
              this.toggleForm();
            }, 1000);
          },
          (error) => {
            console.error('Error al registrar usuario', error);
            this.registerError = 'Error al registrarte crack, a ver si vas a estar usando un nombre que ya existe, eres deficiente?';
          }
        );
    } else {
      this.passwordMismatchError = true;
    }
  }
}

// NO QUITEIS EL COMENTARIO ES PARA GUARDARLO YA QUE HE TOCADO MUCHAS COSAS Y ANTES MEDIO FUNCIONABA, ESPERO QUE FUNCIONE AHORA / FIRMADO: DANI

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-registro',
//   templateUrl: './registro.component.html',
//   styleUrls: ['./registro.component.css'],
// })
// export class RegistroComponent {
//   isLoginForm = true;
//   registerDto: any = {};
//   loginDto: any = {};
//   apiUrl = 'http://localhost:5174/LoginRegister';
//   passwordMismatchError = false;
//   registrationSuccess = false;
//   welcomeMessage: string = '';
//   loginError: string = '';
//   registerError: string = '';

//   constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

//   toggleForm() {
//     this.isLoginForm = !this.isLoginForm;
//   }

//   loginUser(loginDto: any) {
//     this.http.post<any>(`${this.apiUrl}/Login`, loginDto)
//       .subscribe(
//         (response) => {
//           console.log('Inicio de sesión exitoso', response);

//           
//           const username = loginDto.userName;

//         
//           const userId = response.userId;
//           const cestaId = response.cestaId;

//         
//           this.authService.login(userId, cestaId);

//           
//           this.welcomeMessage = `Te gustan los patos? y las zapatillas? Bienvenid@ ${username}! este es tu sitio y es peligroso.`;

//         
//           this.authService.userRol = response.rol;

//          
//           this.loginError = '';

//          
//           setTimeout(() => {
//             this.router.navigate(['/inicio']); // Ajusta la ruta según tu configuración
//           }, 1000);
//         },
//         (error) => {
//           console.error('Error al iniciar sesión', error);

//          
//           this.loginError = 'Echa el freno Madaleno ¿dónde vas?, revisa tus credenciales amantao.';
//         }
//       );
//   }

//   registerUser(registerDto: any) {
//     if (registerDto.password === registerDto.repeatPassword) {
//       this.passwordMismatchError = false;

//       this.http.post<any>(`${this.apiUrl}/Register`, registerDto)
//     .subscribe(
//         (response) => {
//             console.log('Registro exitoso', response);

//           
//             const userId = response.userId;
//             const cestaId = response.cestaId;

//             // Llama al método login del AuthService para establecer el estado de autenticación y los IDs
//             this.authService.login(userId, cestaId);
//             this.registrationSuccess = true;

//          
//             this.registerError = '';

//         
//             setTimeout(() => {
//               this.toggleForm();
//             }, 1000);
//           },
//           (error) => {
//             console.error('Error al registrar usuario', error);

//             
//             this.registerError = 'Error al registrarte crack, a ver si vas a estar usando un nombre que ya existe, eres deficiente?';
//           }
//         );
//     } else {
//       this.passwordMismatchError = true;
//     }
//   }
// }