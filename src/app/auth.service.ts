import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userIdSubject = new BehaviorSubject<number | null>(null);
  private cestaIdSubject = new BehaviorSubject<number | null>(null);
  private _userRol = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private http: HttpClient) {
    this.verificarDatosLocalStorage();
  }

  get userRol(): Observable<string | null> {
    return this._userRol.asObservable();
  }

  set userRol(rol: string | null) {
    this._userRol.next(rol);
  }

  login(userId: number, cestaId: number): void {
    this.isAuthenticated = true;
    this.userIdSubject.next(userId);
    this.cestaIdSubject.next(cestaId);

    // Para guardar los datos en localStorage
    localStorage.setItem('idUsuario', userId.toString());
    localStorage.setItem('idCesta', cestaId.toString());

    this.http.get<any>(`http://localhost:5174/VerUsuario/${userId}`)
      .subscribe(
        (response) => {
          if (response) {
            this._userRol.next(response.rol);
          }
        },
        (error) => {
          console.error('Error al obtener el rol del usuario', error);
        }
      );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userIdSubject.next(null);
    this.cestaIdSubject.next(null);

    //Eliminamos los datos del localStorage al cerrar 
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('idCesta');
    this.router.navigate(['/inicio']);
  }

  verificarDatosLocalStorage(){
    //Para recuperar los datos del localStorage al iniciar el servicio
    const datosUserId = localStorage.getItem('idUsuario');
    const datosCestaId = localStorage.getItem('idCesta');

    if(datosUserId && datosCestaId && !this.isAuthenticated){
      this.login(parseInt(datosUserId), parseInt(datosCestaId));
    }
  }

  isAuthenticatedUser(): boolean {
    this.verificarDatosLocalStorage();
    return this.isAuthenticated;
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  getCestaId(): Observable<number | null> {
    return this.cestaIdSubject.asObservable();
  }
}
