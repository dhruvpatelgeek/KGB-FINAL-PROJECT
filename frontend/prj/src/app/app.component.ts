import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { // get the mapbox GL on load 
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
}

