import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _Router: ActivatedRoute,
    private _CartService: CartService,
    private toast: HotToastService
  ) {}

  baseURL: string = window.location.protocol + '//' + window.location.host;
  cartId: string = '';

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
  });

  handleSubmit(shippingAddress: FormGroup) {
    console.log(shippingAddress.value);

    if (this.cartId === '') {
      this.toast.error('Cart is Empty', {
        duration: 2000,
        position: 'top-right',
        style: {
          marginTop: '90px',
        },
      });
      return;
    } else {
      this._CartService
        .onlinePayment(this.cartId, this.baseURL, shippingAddress.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.toast.success(' You will be redirected to the payment page.', {
              duration: 2000,
              position: 'top-right',
              style: {
                marginTop: '90px',
              },
            });
            // window.location.href = res.session.url;
            window.open(res.session.url, '_blank');
          },
          error: (err) => {
            console.error(err);

            this.toast.error(err.error.message, {
              duration: 2000,
              position: 'top-right',
              style: {
                marginTop: '90px',
              },
            });
          },
        });
    }
  }

  ngOnInit(): void {
    this._Router.params.subscribe((params) => {
      this.cartId = params['cartId'];
      console.log(this.cartId);
      console.log('params', params);
    });
  }
}
