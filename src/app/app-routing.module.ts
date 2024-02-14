import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { AuthTokenGuard } from './auth-token.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'products-details/:asin',
    canActivate: [AuthGuard],
    component: ProductDetailsComponent,
  },
  { path: 'about', canActivate: [AuthGuard], component: AboutComponent },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoriesComponent,
  },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  {
    path: 'checkout/:cartId',
    canActivate: [AuthGuard],
    component: CheckoutComponent,
  },
  { path: 'brands', canActivate: [AuthGuard], component: BrandsComponent },
  { path: 'login', canActivate: [AuthTokenGuard], component: LoginComponent },
  {
    path: 'register',
    canActivate: [AuthTokenGuard],
    component: RegisterComponent,
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
