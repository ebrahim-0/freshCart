import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
  };

  @ViewChild('registerForm', { static: true }) registerForm!: NgForm;

  constructor(private _AuthServices: AuthService) {}

  handleSubmit: any = (e: Event) => {
    e.preventDefault();

    if (this.registerForm.valid) {
      this._AuthServices.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completed');
        },
      });

      console.log('Form is valid', this.registerForm.value);
    } else {
      console.log('Form is invalid', this.registerForm);
    }
  };

  handleError(control: NgModel) {
    return (
      control.invalid &&
      (control.dirty || control.touched || this.registerForm.submitted)
    );
  }
}
