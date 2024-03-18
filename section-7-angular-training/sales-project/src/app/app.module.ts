import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SalesPersonListComponentComponent } from './sales-person-list-component/sales-person-list-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
