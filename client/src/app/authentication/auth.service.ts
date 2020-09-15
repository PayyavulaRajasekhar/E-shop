import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  error: boolean;
  message: string;
  role: string;
  email: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(registrationDetails) {
    return this.http.post<
    {error: boolean, message: string, email?: string}
    >(`${this.baseURL}/register`, registrationDetails);
  }

  login(credentials) {
    return this.http.post<LoginResponse>(`${this.baseURL}/login`, credentials);
  }

  isLoggedIn(): boolean {
    let userData = JSON.parse(localStorage.getItem('loginResponse'));
    if (userData) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    let userData = JSON.parse(localStorage.getItem('loginResponse'));
    if (userData && userData.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  isUser(): boolean {
    let userData = JSON.parse(localStorage.getItem('loginResponse'));
    if (userData && userData.role === 'user') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/authentication/login']);
  }

  getUserName(): string {
    let userData = JSON.parse(localStorage.getItem('loginResponse'));
    if (userData) {
      return userData.fullName;
    }
  }

}
