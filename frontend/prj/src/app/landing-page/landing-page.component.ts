import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { freeapiservice } from '../services/freeapi.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit { // get the mapbox GL on load 

    //send message ot the parent node to change the view
    @Output() authStatus = new EventEmitter<boolean>();

    uuid:string='';
    oneTimeCode:string='';
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
    constructor(private _freeapiservice:freeapiservice){ // USED TO COMMUNATE WITH THE BACKEND
    }
    generalButton() {
        if(this.showOneTimeField==false){
          console.log("sending req for",this.uuid);
          this._freeapiservice.requestEmailCode(this.uuid).toPromise().then().finally(()=>{
             console.log("POST REQUEST DONE")
           });
          this.status="LOGIN"
          this.showOneTimeField=true
        } else {
          this._freeapiservice.requestSendPassword(this.uuid,this.oneTimeCode).toPromise().then((res)=>{
            if(res.isPasswordCorrect==true){
              alert("login verified")

            } else {
              // reset to the previous state
              this.showOneTimeField=false
              this.authStatus.emit(true)
            }
          }).finally(()=>{
            console.log("POST REQUEST DONE")
          });
        }
    }

}

