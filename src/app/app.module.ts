import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: OAuth2Client,
    //   useValue: new OAuth2Client(
    //     environment.gAPI.client_id,
    //     environment.gAPI.client_secret,
    //     environment.gAPI.redirect,
    //   ),
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
