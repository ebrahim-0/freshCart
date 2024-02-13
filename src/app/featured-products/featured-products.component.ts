import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent {
  @Input() product!: Product;

  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService,
    private toast: HotToastService
  ) {}

  addToCart(asin: string) {
    this._CartService.addToCart(asin).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success(res.message, {
          duration: 3000,
          position: 'top-right',
        });
      },
      error: (err) => {
        console.log(err);

        if (err.error.message === 'Token expired') {
          this.toast.error('Token expired Please login again', {
            duration: 2000,
            position: 'top-right',
          });

          setTimeout(() => {
            this._AuthService.logOut();
          }, 2500);
        } else {
          this.toast.error(err.error.message, {
            duration: 3000,
            position: 'top-right',
          });
        }
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
