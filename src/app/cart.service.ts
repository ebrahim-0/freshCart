import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // url: string = 'https://e-commerce-2dfi.onrender.com/api';
  url: string = 'http://localhost:8000/api';

  constructor(private _HttpClient: HttpClient) {}

  addToCart(asin: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this._HttpClient.post(
      `${this.url}/add-to-cart`,
      { asin },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getCart(): Observable<any> {
    const token = localStorage.getItem('token');

    return this._HttpClient.get(`${this.url}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  decrementQuantity(asin: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this._HttpClient.put(`${this.url}/decrement/${asin}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  removeProduct(asin: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this._HttpClient.delete(`${this.url}/delete/${asin}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  clearCart(): Observable<any> {
    const token = localStorage.getItem('token');

    return this._HttpClient.delete(`${this.url}/clear-cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  payment(cartId: string, url: string): Observable<any> {
    return this._HttpClient.post(
      `${this.url}/checkout-session/${cartId}?url=${url}`,
      {}
    );
  }
}
