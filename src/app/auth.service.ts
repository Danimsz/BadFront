import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userIdSubject = new BehaviorSubject<number | null>(null);
  private cestaIdSubject = new BehaviorSubject<number | null>(null);

  constructor(private router: Router) {}

  login(userId: number, cestaId: number): void {
    this.isAuthenticated = true;
    this.userIdSubject.next(userId);
    this.cestaIdSubject.next(cestaId);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userIdSubject.next(null);
    this.cestaIdSubject.next(null);
    this.router.navigate(['/inicio']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  getCestaId(): Observable<number | null> {
    return this.cestaIdSubject.asObservable();
  }
}
