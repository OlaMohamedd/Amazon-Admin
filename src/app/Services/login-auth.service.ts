import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginAdmin } from '../Models/login-admin';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  apiURL = 'http://localhost:3300/admins';
  isLogBehavior: BehaviorSubject<boolean>;
  currentAdmin: LoginAdmin | null = null; // Initialize currentUser to null

  constructor(private http: HttpClient) {
    this.isLogBehavior = new BehaviorSubject<boolean>(this.isAdminLoggedIn());
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<LoginAdmin[]>(this.apiURL).pipe(
      map(admins => {
        const admin = admins.find(u => u.email === email && u.password === password);
        if (admin) {
          let adminToken = "my-token";
          localStorage.setItem("token", adminToken);
          this.currentAdmin = admin; // Store the logged-in user
          this.isLogBehavior.next(true);
          return true;
        } else {
          this.isLogBehavior.next(false);
          return false;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.isLogBehavior.next(false);
  }

  isAdminLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getUserStatus(): Observable<boolean> {
    return this.isLogBehavior.asObservable();
  }
}