import { HttpClient } from '@angular/common/http';
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

  url: string = 'https://e-commerce-api-node.cyclic.app/api';
  // url: string = 'https://e-commerce-2dfi.onrender.com/api';
  // url: string = 'http://localhost:8000/api';

  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.url}/signup`, userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.url}/login`, userData);
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
