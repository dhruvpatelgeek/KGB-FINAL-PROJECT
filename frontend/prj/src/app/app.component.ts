import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  authStatus:boolean=false
  showLandingPage:boolean=true
  showStreamingPage:boolean=false
  ngOnInit() {    
  }
  setAuth() {
    //alert("parent recived the auth status to be true")
    this.authStatus=true
    // first remove the old landing page 
    this.showLandingPage=false
    setTimeout(()=>{
      this.showStreamingPage=true
    }, 100);
    // then add the new banner 

  }
}

