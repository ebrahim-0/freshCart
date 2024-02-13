import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'https://e-commerce-2dfi.onrender.com/api';
  // url: string = 'http://localhost:8000/api';

  constructor(private _HttpClient: HttpClient) {}

  getProducts(): Observable<any> {
    return this._HttpClient.get(`${this.url}/products`);
  }

  setProductDetails(product: any): Observable<any> {
    return this._HttpClient.post(`${this.url}/productDetails`, product);
  }

  getProductDetails(asin: string): Observable<any> {
    return this._HttpClient.get(`${this.url}/getProductDetails?asin=${asin}`);
  }

  getProduct = (asin: string): Observable<any> => {
    return this._HttpClient.get(`${this.url}/product?asin=${asin}`);
  };
}
