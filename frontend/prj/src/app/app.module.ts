import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { StreamingPageComponent } from './streaming-page/streaming-page.component';

import {NgForm} from '@angular/forms';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    StreamingPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
