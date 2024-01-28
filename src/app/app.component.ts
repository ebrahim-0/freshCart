import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weekThreeProject';

  constructor(private _AuthServices: AuthService) {}

  // ngOnInit(): void {
  //   this._AuthServices.checkAuth().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('completed');
  //     },
  //   });
  // }
}
