import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numberOfItems = new BehaviorSubject(0);

  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    private toast: HotToastService,
    @Inject('API_URL_1') private API_URL: string
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
            style: {
              marginTop: '65px',
            },
          });
          setTimeout(() => {
            this._AuthService.logOut();
          }, 2500);
        } else {
          this.toast.error(
            err.error.message || 'Failed to get Number of Items',
            {
              duration: 2000,
              position: 'top-right',
              style: {
                marginTop: '65px',
              },
            }
          );
        }
      },
    });
  }

  addToCart(asin: string): Observable<any> {
    return this._HttpClient.post(`${this.API_URL}/add-to-cart`, { asin });
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`${this.API_URL}/cart`);
  }

  decrementQuantity(asin: string): Observable<any> {
    return this._HttpClient.put(`${this.API_URL}/decrement/${asin}`, null);
  }

  removeProduct(asin: string): Observable<any> {
    return this._HttpClient.delete(`${this.API_URL}/delete/${asin}`);
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.API_URL}/clear-cart`);
  }

  onlinePayment(
    cartId: string,
    url: string,
    shippingAddress: object
  ): Observable<any> {
    return this._HttpClient.post(
      `${this.API_URL}/checkout-session/${cartId}?url=${url}`,
      { shippingAddress: shippingAddress }
    );
  }
}
