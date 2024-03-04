import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
    this.isAuthenticatedUser().subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
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

    localStorage.setItem('idUsuario', userId.toString());
    localStorage.setItem('idCesta', cestaId.toString());

    this.http.get<any>(`http://localhost:5174/Usuario/VerUsuario/${userId}`)
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

    localStorage.removeItem('idUsuario');
    localStorage.removeItem('idCesta');
    this.router.navigate(['/inicio']);
  }

  verificarDatosLocalStorage(){
    const datosUserId = localStorage.getItem('idUsuario');
    const datosCestaId = localStorage.getItem('idCesta');

    if(datosUserId && datosCestaId && !this.isAuthenticated){
      this.login(parseInt(datosUserId), parseInt(datosCestaId));
    }
  }

  isAuthenticatedUser(): Observable<boolean> {
    this.verificarDatosLocalStorage();
    return of(this.isAuthenticated);
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  getCestaId(): Observable<number | null> {
    return this.cestaIdSubject.asObservable();
  }
}
