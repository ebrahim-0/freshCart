import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
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
  });

  isLoading: boolean = false;

  errorMessage: string = '';

  constructor(private _AuthServices: AuthService, private _Router: Router) {}

  handleRegister = (registerForm: FormGroup) => {
    this.isLoading = true;

    registerForm.markAllAsTouched();

    if (registerForm.valid) {
      this.errorMessage = '';
      this._AuthServices.register(registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);

          if (res.message === 'User Created Successfully') {
            this.isLoading = false;

            this._Router.navigate(['/login']);
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

      console.log('Form is valid', registerForm.value);
    } else {
      this.isLoading = false;

      console.log('Form is invalid', registerForm);
    }
  };
}
