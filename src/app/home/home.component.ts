import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(private _GetProductsService: GetProductsService) {}

  ngOnInit(): void {
    this.products = this._GetProductsService.setProducts;

    // this._GetProductsService.getProducts().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.products = res;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('completed');
    //   },
    // });
  }
}
