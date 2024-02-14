import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';
import { ICart } from '../interfaces/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: ICart;
  change: boolean = false;
  load: boolean = false;
  loadMsg: string = '';
  loadingMsg: string = '';

  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService,
    private toast: HotToastService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.loadingMsg = 'Cart is Loading...';
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        console.log(res);
        this._CartService.numberOfItems.next(res.numberOfCartItem);
        console.log(this._CartService.numberOfItems.getValue());

        this.loadingMsg = '';

        if (res.message === 'Cart is empty') {
          this.toast.error(res.message, {
            duration: 2000,
            position: 'top-right',
          });
          this.loadingMsg = 'Cart is empty';
        }
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, {
            duration: 2000,

            position: 'top-right',
          });
        }
      },
      complete: () => {},
    });
  }

  incrementQuantity(asin: string) {
    this.load = true;
    this._CartService.addToCart(asin).subscribe({
      next: (res) => {
        this.getCart();
        this.toast.success(res.message, {
          duration: 2000,
          position: 'top-right',
        });
        this.load = false;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, {
            duration: 2000,
            position: 'top-right',
          });
        }

        this.load = false;
      },
    });
  }

  decrementQuantity(asin: string) {
    this.load = true;
    this._CartService.decrementQuantity(asin).subscribe({
      next: (res) => {
        this.getCart();
        this.toast.success(res.message, {
          duration: 2000,
          position: 'top-right',
        });
        this.load = false;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, {
            duration: 2000,
            position: 'top-right',
          });
        }
        this.load = false;
      },
    });
  }

  removeProduct(asin: string) {
    this.load = true;
    this._CartService.removeProduct(asin).subscribe({
      next: (res) => {
        this.load = false;
        this.toast.success(res.message, {
          duration: 2000,
          position: 'top-right',
        });
        this.getCart();
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, {
            duration: 2000,
            position: 'top-right',
          });
          this.load = false;
        }
      },
    });
  }

  clearCart() {
    this.load = true;
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this.getCart();
        this.toast.success('Cart is cleared', {
          duration: 2000,
          position: 'top-right',
        });
        this.load = false;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, {
            duration: 2000,
            position: 'top-right',
          });
          this.load = false;
        }
      },
    });
  }

  handleTokenExpired() {
    this.toast.error('Token expired. Please login again', {
      duration: 2000,
      position: 'top-right',
    });
    setTimeout(() => {
      this._AuthService.logOut();
    }, 2500);
  }

  handlePayment(cartId: string) {
    this.load = true;
    this.loadMsg = 'Payment is processing...';

    this._Router.navigate(['/checkout', cartId]);
  }
}
