import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { __asyncValues } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weekThreeProject';

  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    this._AuthService.decodeUserData();
  }
}
