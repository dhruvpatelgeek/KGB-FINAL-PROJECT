import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { freeapiservice } from '../services/freeapi.service';
import{Users} from '../classes/users';
@Component({
  selector: 'app-streaming-page',
  templateUrl: './streaming-page.component.html',
  styleUrls: ['./streaming-page.component.css']
})
export class StreamingPageComponent implements OnInit {
  uuid:string='';
  oneTimeCode:string='';
  //[events]-----------------------------
   @Output() signOutVal = new EventEmitter<boolean>();
  //-------------------------------------
  user_array: Users[] = []; // associatve array of item objects
 // associatve array of item objects
  user:Users | undefined; // single instance of item object

  ngOnInit(): void {
    setInterval(() =>{ 
      this._freeapiservice.requestGetUsers(this.uuid,this.oneTimeCode).subscribe(
        (data)=>{
          this.user_array=data;
          console.log("user array is ")
          console.log(this.user_array)
        }
      );
    },1000) 
    
  }
  constructor(private _freeapiservice:freeapiservice){ // USED TO COMMUNATE WITH THE BACKEND
  }
  pollUsers(){
    this._freeapiservice.requestGetUsers(this.uuid,this.oneTimeCode).subscribe(
      (data)=>{
        this.user_array=data;
        console.log("user array is ")
        console.log(this.user_array)
      }
    );
  }
  signOut(){
   
    this.signOutVal.emit(true);
  }
}
