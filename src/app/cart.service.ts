import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: string = 'https://e-commerce-api-one.cyclic.app/api';
  // url: string = 'https://e-commerce-2dfi.onrender.com/api';
  // url: string = 'http://localhost:8000/api';

  token = localStorage.getItem('token');

  numberOfItems = new BehaviorSubject(0);

  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    private toast: HotToastService
  ) {
    this.getNumberOfItems();
  }

  getNumberOfItems() {
    this.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.numberOfItems.next(res.numberOfCartItem);
      },
      error: (err) => {
        if (err.error.message === 'Token expired') {
          this.toast.error('Token expired. Please login again', {
            duration: 2000,
            position: 'top-right',
          });
          setTimeout(() => {
            this._AuthService.logOut();
          }, 2500);
        } else {
          this.toast.error(err.error.message, {
            duration: 2000,

            position: 'top-right',
          });
        }
      },
    });
  }

  addToCart(asin: string): Observable<any> {
    return this._HttpClient.post(
      `${this.url}/add-to-cart`,
      { asin },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`${this.url}/cart`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  decrementQuantity(asin: string): Observable<any> {
    return this._HttpClient.put(`${this.url}/decrement/${asin}`, null, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  removeProduct(asin: string): Observable<any> {
    return this._HttpClient.delete(`${this.url}/delete/${asin}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.url}/clear-cart`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  onlinePayment(
    cartId: string,
    url: string,
    shippingAddress: object
  ): Observable<any> {
    return this._HttpClient.post(
      `${this.url}/checkout-session/${cartId}?url=${url}`,
      { shippingAddress: shippingAddress },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
