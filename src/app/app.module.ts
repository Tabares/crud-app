import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Http, HttpModule, BaseRequestOptions} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { AppComponent } from './app.component';
import { VacationsComponent } from './vacations/vacations.component';
import { MaterialModule } from '@angular/material';
import { SpotifyComponent } from './spotify/spotify.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObservablesComponent } from './observables/observables.component';

@NgModule({
  declarations: [
    AppComponent,
    VacationsComponent,
    SpotifyComponent,
    SearchComponent,
    ObservablesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    BaseRequestOptions,
    HttpModule,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
