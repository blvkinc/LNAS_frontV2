import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ApiModule} from './api/api.module';
import {NgApexchartsModule} from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ApiModule.forRoot({rootUrl: 'http://localhost:8080'}),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
  ],
 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
