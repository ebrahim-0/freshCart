import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isLoading: boolean = false;

  errorMessage: string = '';

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toast: HotToastService
  ) {}

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,

        Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
      ]),
      password_confirmation: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
    },
    { validators: this.matchPassword }
  );

  matchPassword(registerForm: any) {
    if (
      registerForm.get('password')?.value !==
      registerForm.get('password_confirmation')?.value
    ) {
      const match = {
        matchPassword: 'Password confirmation must match password.',
      };

      registerForm.get('password_confirmation')?.setErrors(match);
      return match;
    } else {
      return null;
    }
  }

  handleRegister(registerForm: FormGroup) {
    this.isLoading = true;

    registerForm.markAllAsTouched();

    if (registerForm.valid) {
      this.errorMessage = '';
      this._AuthService.register(registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          // if want to login directly after register
          localStorage.setItem('token', res.token);
          this._AuthService.decodeUserData();
          if (res.message === 'User Created Successfully') {
            this.toast.success(res.message, {
              duration: 2000,
              position: 'top-right',
              style: {
                marginTop: '65px',
              },
            });
            this.isLoading = false;
            // location.reload();
            this._Router.navigate(['/']);

            // this._Router.navigate(['/login']);
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
  }
}
