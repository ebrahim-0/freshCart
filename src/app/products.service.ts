import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private _HttpClient: HttpClient,
    @Inject('API_URL_1') private API_URL: string
  ) {}

  getProducts(): Observable<any> {
    return this._HttpClient.get(`${this.API_URL}/products`);
  }

  setProductDetails(product: any): Observable<any> {
    return this._HttpClient.post(`${this.API_URL}/productDetails`, product);
  }

  getProductDetails(asin: string): Observable<any> {
    return this._HttpClient.get(
      `${this.API_URL}/getProductDetails?asin=${asin}`
    );
  }

  getProduct = (asin: string): Observable<any> => {
    return this._HttpClient.get(`${this.API_URL}/product?asin=${asin}`);
  };
}
