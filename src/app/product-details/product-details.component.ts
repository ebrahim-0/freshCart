import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _Router: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  asin: any = new BehaviorSubject('');

  product!: any;

  limitWord: number = 400;

  showTooltip: boolean = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  moveTooltip(event: MouseEvent) {
    const desc = this.elementRef.nativeElement.querySelector('.desc');

    const tooltipElement =
      this.elementRef.nativeElement.querySelector('.tooltip');

    let descRect = desc.getBoundingClientRect();

    if (tooltipElement) {
      let left = event.clientX;
      let top = event.clientY;

      tooltipElement.style.display = 'block';
      tooltipElement.style.top = top - descRect.top + 15 + 'px';
      tooltipElement.style.left = left - descRect.left + 15 + 'px';
      this.showTooltip = true;
    }
  }

  toggleWordLimit() {
    this.limitWord =
      this.limitWord === this.product.product_description.length
        ? 400
        : this.product.product_description.length;
  }
  ngOnInit(): void {
    this._Router.params.subscribe((params) => {
      const asin = params['asin']; // Fetch 'asin' from route parameters
      this.asin = params['asin'];
      this._ProductsService.getProductDetails(asin).subscribe({
        next: (res) => {
          console.log(res);
          this.product = res;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completed');
        },
      });
    });
  }
}
