import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,

      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
    ]),
  });

  isLoading: boolean = false;

  errorMessage: string = '';

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toast: HotToastService
  ) {}

  handleLogin = (loginForm: FormGroup) => {
    this.isLoading = true;

    loginForm.markAllAsTouched();

    if (loginForm.valid) {
      this.errorMessage = '';
      this._AuthService.login(loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);

          this._AuthService.decodeUserData();

          if (res.message === 'User Login Successfully') {
            this.isLoading = false;

            this._Router.navigate(['/']);
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMessage = err.error.message;
          this.toast.error(err.error.message, {
            duration: 2000,
            position: 'top-right',
            style: {
              marginTop: '65px',
            },
          });
        },
        complete: () => {
          console.log('completed');
        },
      });
    } else {
      this.isLoading = false;
    }
  };
}
