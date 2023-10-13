import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginAdmin } from 'src/app/Models/login-admin';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  apiURL = 'http://localhost:3300/admin/login';
  isLogBehavior: BehaviorSubject<boolean>;
  currentAdmin: LoginAdmin | null = null; // Initialize currentUser to null

  constructor(private http: HttpClient) {
    this.isLogBehavior = new BehaviorSubject<boolean>(this.isAdminLoggedIn());
  }

  
  
  login(email: string, pwd: string): Observable<boolean> {
    const options = {
      withCredentials:true
  
    }
    return this.http.post<any>(this.apiURL, { email , pwd }, options).pipe(
      map(response => {
        const { accessToken } = response;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          this.currentAdmin = response.admin; 
          this.isLogBehavior.next(true);
          return true;
        } else {
          this.isLogBehavior.next(false);
          return false;
        }
      })
    );
  }


  logout(): Observable<boolean>  {
    
   localStorage.removeItem("accessToken");
   
    return this.http.get<any>("http://localhost:3300/admin/logout")
    this.isLogBehavior.next(false);
  }

  isAdminLoggedIn(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }

  getUserStatus(): Observable<boolean> {
    return this.isLogBehavior.asObservable();
  }
}