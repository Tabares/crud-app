import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Http, HttpModule, BaseRequestOptions} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';



import { AppComponent } from './app.component';
import { VacationsComponent } from './vacations/vacations.component';

@NgModule({
  declarations: [
    AppComponent,
    VacationsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    BaseRequestOptions,
    HttpModule,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
