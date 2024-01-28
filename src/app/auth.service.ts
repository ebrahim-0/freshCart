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
      'http://localhost:5000/api/auth/signup',
      userData
    );
  }

  checkAuth(): Observable<any> {
    return this._HttpClient.get('http://localhost:5000/api/auth/check-auth');
  }

  // getCookies(): Observable<any> {
  //   return document.cookie;
  // }
}
