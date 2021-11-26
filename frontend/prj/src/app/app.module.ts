// angular modules==========================================
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {NgForm} from '@angular/forms';
import { FormsModule }   from '@angular/forms';
//==========================================================

//components================================================
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StreamingPageComponent } from './streaming-page/streaming-page.component';
//==========================================================

//angular http==============================================
import { HttpClientModule } from '@angular/common/http';
//==========================================================

//services==================================================
import { freeapiservice } from './services/freeapi.service';
//==========================================================




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
    HttpClientModule,
  ],
  providers: [freeapiservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
