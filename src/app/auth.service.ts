import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    @Inject('API_URL_1') private API_URL: string
  ) {
    if (localStorage.getItem('token')) {
      this.decodeUserData();
    }
  }

  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.API_URL}/signup`, userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.API_URL}/login`, userData);
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
}
