import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuth2Client } from 'google-auth-library';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: OAuth2Client,
      useValue: new OAuth2Client(
        environment.gAPI.client_id,
        environment.gAPI.client_secret,
        environment.gAPI.redirect,
      ),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
