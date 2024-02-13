import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: ICart;
  change: boolean = false;
  loadingMsg: string = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.loadingMsg = 'Cart is Loading...';
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        console.log(res);

        this.loadingMsg = '';

        if (res.message === 'Cart is empty') {
          this.toast.error(res.message, { duration: 2000 });
          this.loadingMsg = 'Cart is empty';
        }

        console.log(this.loadingMsg);
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, { duration: 2000 });
        }
      },
      complete: () => {},
    });
  }

  incrementQuantity(asin: string) {
    this.change = true;

    this.cartService.addToCart(asin).subscribe({
      next: (res) => {
        this.getCart();
        this.toast.success(res.message, { duration: 2000 });
        this.change = false;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, { duration: 2000 });
        }

        this.change = false;
      },
    });
  }

  decrementQuantity(asin: string) {
    this.change = true;
    this.cartService.decrementQuantity(asin).subscribe({
      next: (res) => {
        this.getCart();
        this.toast.success(res.message, { duration: 2000 });
        this.change = false;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, { duration: 2000 });
        }

        this.change = false;
      },
    });
  }

  removeProduct(asin: string) {
    this.change = true;
    this.cartService.removeProduct(asin).subscribe({
      next: (res) => {
        this.change = false;
        this.toast.success(res.message, { duration: 2000 });
        this.getCart();
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, { duration: 2000 });
          this.change = false;
        }
      },
    });
  }

  clearCart() {
    this.change = true;
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.getCart();
        this.toast.success('Cart is cleared', { duration: 2000 });
        this.change = false;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'Token expired') {
          this.handleTokenExpired();
        } else {
          this.toast.error(err.error.message, { duration: 2000 });
          this.change = false;
        }
      },
    });
  }

  handleTokenExpired() {
    this.toast.error('Token expired. Please login again', { duration: 2000 });
    setTimeout(() => {
      this.authService.logOut();
    }, 2500);
  }
}

interface ICart {
  createdAt: string;
  items: Array<IItem>;
  totalPrice: number;
  updatedAt: string;
  userId: string;
  _id: string;
}

interface IItem {
  asin: string;
  quantity: number;
  product: IProduct;
}

interface IProduct {
  asin: string;
  title: string;
  url: string;
  image: string;
  price: string;
  rating_count: number;
  stars: number;
}
