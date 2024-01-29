import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://auth-64ql.onrender.com/api/auth/signup',
      userData
    );
  }

  checkAuth(): Observable<any> {
    return this._HttpClient.get(
      'https://auth-64ql.onrender.com/api/auth/check-auth'
    );
  }

  // getCookies(): Observable<any> {
  //   return document.cookie;
  // }
}
