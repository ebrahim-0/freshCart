import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from '../interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];

  searchTerm!: string;

  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
