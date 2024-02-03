import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token')) {
      this.decodeUserData();
    }
  }

  url: string = 'https://login-auth-zj9a.onrender.com';
  // url: string = 'http://localhost:8000';

  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.url}/api/signup`, userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.url}/api/login`, userData);
  }

  logOut() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  decodeUserData() {
    const token = JSON.stringify(localStorage.getItem('token'));

    const encodedToken: any = jwtDecode(token);

    this.userData.next(encodedToken);
    console.log(encodedToken);
    return encodedToken;
  }

  // checkAuth(): Observable<any> {
  //   const token = localStorage.getItem('token');

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this._HttpClient.get(`${this.url}/api/profile`, {
  //     headers,
  //   });
  // }
}
