import{Injectable} from '@angular/core'
import{Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'

@Injectable()//declaring a class of type injectable
export class freeapiservice{
    url="https://bribchat.com:44369";//DRY principle
    //now we will inject the httpt client using the constuctor
    constructor(private httpclient: HttpClient){};

    //get all items in store
    getallitems(): Observable<any> {
        return this.httpclient.get(this.url+"/cat/all");
    }
 
}