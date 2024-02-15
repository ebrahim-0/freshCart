import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from '../interfaces/product';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];

  searchTerm!: string;

  constructor(
    private _ProductsService: ProductsService,

    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res;

        this.toast.success('Products get Successfully', {
          duration: 2000,
          position: 'top-right',
          style: {
            marginTop: '65px',
          },
        });
      },
      error: (err) => {
        console.log(err);

        this.toast.error(err.error.message || 'Failed to get Products', {
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
  }
}
