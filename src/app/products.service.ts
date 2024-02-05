import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  setProducts = [
    {
      asin: 'B0B2D77YB8',
      title:
        'Newest 14" Ultral Light Laptop for Students and Bu…Office 365, Webcam, HDMI, WiFi, USB-A&C, Win 11 S',
      url: 'https://www.amazon.com/dp/B0B2D77YB8',
      image: 'https://m.media-amazon.com/images/I/711OHeRmEaL._AC_UY218_.jpg',
      price: '$259.99',
      rating_count: 1089,
      stars: 4.2,
    },
    {
      asin: 'B0947BJ67M',
      title:
        '14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB St…icrosoft 365 (14-dq0040nr, 2021, Snowflake White)',
      url: 'https://www.amazon.com/dp/B0947BJ67M',
      image: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg',
      price: '$180.00',

      rating_count: 848,
      stars: 3.8,
    },
    {
      asin: 'B0BL35XNF5',
      title:
        'Aspire 1 A115-32-C96U Slim Laptop | 15.6" FHD Disp…-Year Subscription | Windows 11 in S Mode, Silver',
      url: 'https://www.amazon.com/dp/B0BL35XNF5',
      image: 'https://m.media-amazon.com/images/I/81ux3SQKXrL._AC_UY218_.jpg',
      price: '$214.99',

      rating_count: 3618,
      stars: 4.3,
    },
    {
      asin: 'B0CQLWJMSC',
      title:
        '16GB RAM Laptop Computer, 512GB SSD, FHD IPS 1920x… Laptop, Numeric Keypad, 2.4/5G WiFi, 2MP Webcam.',
      url: 'https://www.amazon.com/dp/B0CQLWJMSC',
      image: 'https://m.media-amazon.com/images/I/71y3pAXzesL._AC_UY218_.jpg',
      price: '$329.99',

      rating_count: 14,
      stars: 4.3,
    },
    {
      asin: 'B0CKN6R3X7',
      title:
        'Dell Chromebook 3180 Laptop Computer, 11.6 Inch La…mera, Wi-Fi, Bluetooth, HDMI, Chrome OS (Renewed)',
      url: 'https://www.amazon.com/dp/B0CKN6R3X7',
      image: 'https://m.media-amazon.com/images/I/61hmSH8an5L._AC_UY218_.jpg',
      price: '$54.99',

      rating_count: 9,
      stars: 4.4,
    },
    {
      asin: 'B0CKT6K58Q',
      title:
        'Laptop, 16 Inch FHD IPS 16:10 Screen, Intel Celero… Subscription, 4 Stereo Speakers, Numeric Keypad.',
      url: 'https://www.amazon.com/dp/B0CKT6K58Q',
      image: 'https://m.media-amazon.com/images/I/712uBQXF9QL._AC_UY218_.jpg',
      price: '$229.90',

      rating_count: 29,
      stars: 4.4,
    },
    {
      asin: 'B09Z111KTW',
      title:
        'HP Newest 14" HD Laptop, Windows 11, Intel Celeron…Up to 2.60GHz, 4GB RAM, 64GB SSD, Webcam(Renewed)',
      url: 'https://www.amazon.com/dp/B09Z111KTW',
      image: 'https://m.media-amazon.com/images/I/51wUE2WiNrL._AC_UY218_.jpg',
      price: '$152.00',

      rating_count: 1661,
      stars: 4,
    },
    {
      asin: 'B0BS4BP8FB',
      title:
        'Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD…GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Mode',
      url: 'https://www.amazon.com/dp/B0BS4BP8FB',
      image: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg',
      price: '$308.81',

      rating_count: 1165,
      stars: 4.3,
    },
    {
      asin: 'B0CKFMHLB3',
      title:
        'Essential Laptop, 14" HD Display, Intel Celeron N4…45, 1 Year Office 365, Windows 11 Home, Rose Gold',
      url: 'https://www.amazon.com/dp/B0CKFMHLB3',
      image: 'https://m.media-amazon.com/images/I/71VnKaU4YpL._AC_UY218_.jpg',
      price: '$215.00',
      rating_count: 356,
      stars: 4.2,
    },
    {
      asin: 'B09VJYQW44',
      title:
        'Vivobook Laptop L210 11.6" Ultra Thin Laptop, Inte…ar of Office 365 Personal, L210MA-DS04,Star Black',
      url: 'https://www.amazon.com/dp/B09VJYQW44',
      image: 'https://m.media-amazon.com/images/I/71pAjS2SNUL._AC_UY218_.jpg',
      price: '$169.99',
      rating_count: 897,
      stars: 3.9,
    },
    {
      asin: 'B0CRSR6KV1',
      title:
        'Portable 13.8" HD IPS Laptop, Intel Celeron N Proc…ebcam, Bluetooth, Windows 11, Azure Blue(Renewed)',
      url: 'https://www.amazon.com/dp/B0CRSR6KV1',
      image: 'https://m.media-amazon.com/images/I/51vk2xZdk8L._AC_UY218_.jpg',
      price: '$151.99',

      rating_count: null,
      stars: null,
    },
    {
      asin: 'B0CN13WZC6',
      title:
        'Laptop Computer, 15.6" Laptop, 8GB DDR4 256GB SSD,…attery Capacity, WiFi, Bluetooth, Type-C, TF Card',
      url: 'https://www.amazon.com/dp/B0CN13WZC6',
      image: 'https://m.media-amazon.com/images/I/61moVuRyfBL._AC_UY218_.jpg',
      price: '$199.99',

      rating_count: 114,
      stars: 4.3,
    },
    {
      asin: 'B0CDKLYZPV',
      title:
        'Vivobook Go 14 L410 Ultra Thin Laptop, 14” FHD Dis…de, 1 Year Microsoft 365, Star Black, L410MA-AH02',
      url: 'https://www.amazon.com/dp/B0CDKLYZPV',
      image: 'https://m.media-amazon.com/images/I/71RDNz9y4aL._AC_UY218_.jpg',
      price: '$169.19',

      rating_count: 1186,
      stars: 3.8,
    },
    {
      asin: 'B08YKHYCPW',
      title:
        'IdeaPad 1 14 Laptop, 14.0" HD Display, Intel Celer…ntel UHD Graphics 600, Win 10 in S Mode, Ice Blue',
      url: 'https://www.amazon.com/dp/B08YKHYCPW',
      image: 'https://m.media-amazon.com/images/I/71IVTMa5JQL._AC_UY218_.jpg',
      price: '$179.99',

      rating_count: 1827,
      stars: 4.3,
    },
    {
      asin: 'B0C7MR5RDH',
      title:
        '2023 Newest Chromebook Laptop, 14 Inch Display, In…hics 600, WiFi, Bluetooth, Chrome OS, Modern Gray',
      url: 'https://www.amazon.com/dp/B0C7MR5RDH',
      image: 'https://m.media-amazon.com/images/I/51PsNbMd-CL._AC_UY218_.jpg',
      price: '$188.00',

      rating_count: 73,
      stars: 4.3,
    },
    {
      asin: 'B0CLJVH6L4',
      title:
        '17 Slim Laptop Intel Processor up to 2.8GHz 17in F…64GB Storage WiFi + BT Chrome OS (CX17 – Renewed)',
      url: 'https://www.amazon.com/dp/B0CLJVH6L4',
      image: 'https://m.media-amazon.com/images/I/61iM+vfTdFL._AC_UY218_.jpg',
      price: '$189.00',

      rating_count: 65,
      stars: 4.2,
    },
  ];

  // private apiUrl: string =
  //   'https://amazon-product-data6.p.rapidapi.com/product-detail';
  // private rapidApiKey: string =
  //   '6c107e1433msh933b5efbe536499p155269jsn2b63eef3bedf';
  // private rapidApiHost: string = 'amazon-product-data6.p.rapidapi.com';

  url: string = 'https://login-auth-zj9a.onrender.com';
  // url: string = 'http://localhost:8000';

  constructor(private _HttpClient: HttpClient) {}

  getProducts(): Observable<any> {
    return this._HttpClient.get(`${this.url}/api/products`);
  }

  setProductDetails(product: any): Observable<any> {
    return this._HttpClient.post(`${this.url}/api/productDetails`, product);
  }

  getProductDetails(asin: string): Observable<any> {
    return this._HttpClient.get(
      `${this.url}/api/getProductDetails?asin=${asin}`
    );
  }

  // getProductDetail(asin: string, country: string): Observable<any> {
  //   return this._HttpClient.get(this.apiUrl, {
  //     params: {
  //       asin: asin,
  //       country: country,
  //     },
  //     headers: {
  //       'X-RapidAPI-Key': this.rapidApiKey,
  //       'X-RapidAPI-Host': this.rapidApiHost,
  //     },
  //   });
  // }

  // getProductDetail(asin: string, country: string): Observable<any> {
  //   const headers = new HttpHeaders()
  //     .set('X-RapidAPI-Key', this.rapidApiKey)
  //     .set('X-RapidAPI-Host', this.rapidApiHost);

  //   const params = new HttpParams().set('asin', asin).set('country', country);

  //   return this._HttpClient.get(this.apiUrl, { headers, params });
  // }
}
