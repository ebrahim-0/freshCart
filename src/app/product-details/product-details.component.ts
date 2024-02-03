import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../get-products.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _GetProductsService: GetProductsService,
    private _Router: ActivatedRoute
  ) {}

  asin: any = new BehaviorSubject('');

  product!: any;

  ngOnInit(): void {
    this._Router.params.subscribe((params) => {
      const asin = params['asin']; // Fetch 'asin' from route parameters
      this.asin = params['asin'];

      this._GetProductsService.getProductDetails(asin).subscribe({
        next: (res) => {
          console.log(res);
          this.product = res;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completed');
        },
      });
    });
  }
}
