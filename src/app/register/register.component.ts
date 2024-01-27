import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

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

  handleSubmit: any = (e: Event) => {
    e.preventDefault();

    if (this.registerForm.valid) {
      console.log('Form is valid', this.form);
      // Perform your registration logic here
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
