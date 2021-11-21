import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit { // get the mapbox GL on load 
    uuid:string='Enter your UUID here ...';
    oneTimeCode:string='Enter your one-time-code...';
    status:string="SEND CODE TO EMAIL";
    showOneTimeField=false;
    ngOnInit() {
          const map = new mapboxgl.Map({
          style: 'mapbox://styles/dhruvpatel1999/ckw7mxfnt4rpi15l9hu7gnz51',
          center: [-123.066666, 49.316666],
          zoom: 10.5,
          pitch: 55,
          bearing: 0,
          container: 'map',
          antialias: true,
          accessToken :'pk.eyJ1IjoiZGhydXZwYXRlbDE5OTkiLCJhIjoiY2t3N213YTkyOHdocjJubnV4ejMwaWQ2ayJ9.1szBXJZi6kHtzG1enC4lXA'
  
      });
      
    }
    generalButton() {
        if(this.showOneTimeField==false){
          // sent the email
          alert("email sent")
          this.status="LOGIN"
          this.showOneTimeField=true
        } else {
          alert("login sent")
          // sent code to frontend to verify
        }
    }

}

