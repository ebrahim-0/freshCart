import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private _AuthServices: AuthService, private _Router: Router) {}

  handleLogin = (loginForm: FormGroup) => {
    this.isLoading = true;

    loginForm.markAllAsTouched();

    if (loginForm.valid) {
      this.errorMessage = '';
      this._AuthServices.login(loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);

          this._AuthServices.decodeUserData();

          if (res.message === 'User Login Successfully') {
            this.isLoading = false;

            this._Router.navigate(['/']);
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMessage = err.error.message;
        },
        complete: () => {
          console.log('completed');
        },
      });

      console.log('Form is valid', loginForm.value);
    } else {
      this.isLoading = false;

      console.log('Form is invalid', loginForm);
    }
  };
}
