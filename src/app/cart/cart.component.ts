import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: any;
  products: any[] = [];

  getCart: string = '';

  constructor(
    private _CartService: CartService,
    private _ProductsService: ProductsService,
    private _AuthService: AuthService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getCart = 'Getting cart...';

    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;

        console.log('cart', this.cart);

        if (res.message !== 'Cart is empty') {
          res.items.forEach((item: any) => {
            this._ProductsService.getProduct(item.asin).subscribe({
              next: (res) => {
                this.products.push({ ...res, quantity: item.quantity });
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {
                console.log('completed');
                console.log('products', this.products);
              },
            });
          });
        } else {
          this.getCart = res.message;
        }
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
            duration: 2000,
            position: 'top-right',
          });
        }
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  getTotal(): number {
    return this.products.reduce(
      (total, product) =>
        total + parseFloat(product.price.substring(1)) * product.quantity,
      0
    );
  }

  incrementQuantity(asin: string) {
    this.products.forEach((product) => {
      if (product.asin === asin) {
        product.quantity++;
        this._CartService.addToCart(asin).subscribe({
          next: (res) => {
            console.log(res);
            this.toast.success(res.message, {
              duration: 2000,
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
                duration: 2000,
                position: 'top-right',
              });
            }
          },
          complete: () => {
            console.log('completed');
          },
        });
      }
    });
  }

  decrementQuantity(asin: string) {
    const newAsin = asin;

    this.products.forEach((product) => {
      if (product.asin === asin) {
        if (product.quantity > 1) {
          product.quantity--;
          this._CartService.decrementQuantity(newAsin).subscribe({
            next: (res) => {
              console.log(res);
              this.toast.success(res.message, {
                duration: 2000,
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
                  duration: 2000,
                  position: 'top-right',
                });
              }
            },
            complete: () => {
              console.log('completed');
            },
          });
        } else {
          this.products = this.products.filter(
            (product) => product.asin !== asin
          );

          this._CartService.removeProduct(newAsin).subscribe({
            next: (res) => {
              console.log(res);
              this.toast.success(res.message, {
                duration: 2000,
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
                  duration: 2000,
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
    });
  }

  removeProduct(asin: string) {
    const newAsin = asin;
    this.products = this.products.filter((product) => product.asin !== asin);

    this._CartService.removeProduct(newAsin).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success(res.message, {
          duration: 2000,
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
            duration: 2000,
            position: 'top-right',
          });
        }
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  clearCart() {
    this.products = [];
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success('Cart is cleared', {
          duration: 2000,
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
            duration: 2000,
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
