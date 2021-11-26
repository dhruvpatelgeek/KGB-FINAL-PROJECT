import{Injectable} from '@angular/core'
import{Observable} from 'rxjs'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
// to encrypt the password 
import * as crypto from 'crypto-js';
@Injectable()//declaring a class of type injectable
export class freeapiservice{
    url="http://localhost:3000";//DRY principle
    //now we will inject the httpt client using the constuctor
    constructor(private httpclient: HttpClient){};

    //request email code 
    requestEmailCode(username: string){
        //const authurl:string =this.url+"/uuid/require"
        const authurl:string = "http://localhost:3000/uuid/require"
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          };
          var payload = {
                uuid:"72fb158f-8d8c-4892-af0e-42f22e47f33b"
         }
         var json_load=JSON.stringify(payload)
        return this.httpclient.post<any>(authurl, json_load, httpOptions)
    }
    
    requestSendPassword(username: string,password:string){
      //const authurl:string =this.url+"/uuid/require"
      const authurl:string = "http://localhost:3000/uuid/verify"
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
          })
        };
        //var hashedPassword=crypto.createHash('sha256').update(password).digest('hex');
        var hashedPassword : string =crypto.SHA256(password).toString()
        var payload = {
              uuid:"72fb158f-8d8c-4892-af0e-42f22e47f33b",
              password:hashedPassword
       }
      var json_load=JSON.stringify(payload)
      return this.httpclient.post<any>(authurl, json_load, httpOptions)
  }

}