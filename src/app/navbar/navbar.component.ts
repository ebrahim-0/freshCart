import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  numberOfCartItem: number = 0;

  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this._CartService.numberOfItems.subscribe({
      next: (res) => {
        this.numberOfCartItem = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }

  logOut() {
    this._AuthService.logOut();
  }
}
