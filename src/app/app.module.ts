import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from './mainSlider/mainSlider.component';
import { BuyPipe } from './buy.pipe';
import { SeeMorePipe } from './see-more.pipe';
import { SearchPipe } from './search.pipe';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeadersInterceptor } from './headers.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CategoriesComponent,
    CartComponent,
    BrandsComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    FooterComponent,
    NavbarComponent,
    ProductDetailsComponent,
    MainSliderComponent,
    BuyPipe,
    SeeMorePipe,
    SearchPipe,
    FeaturedProductsComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    HotToastModule.forRoot(),
  ],
  providers: [
    {
      provide: 'API_URL_1',
      useValue: 'https://e-commerce-2dfi.onrender.com/api',
    },
    {
      provide: 'API_URL_2',
      useValue: 'http://localhost:8000/api',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
