import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes =[
  // always mention most specific routes first, like catch block in java
  // if match render
  // else check further routes
  // no need to mention / at beginning of route, angular takes care
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  // no path mentioned then go to /products page
  // fo redirect mention exact redirectTo including /
  {path: '',  redirectTo: '/products', pathMatch: 'full'},
  // wildcard matches on any path, thats y at last
  {path: '**',  redirectTo: '/products', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    // add this so that routes will configured globally
    RouterModule.forRoot(routes),
    // importing reactive form modules to work with reactive forms
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  // adding classes in providers with @Injectable anno, so that NgModule will allow injection in other parts of app
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
