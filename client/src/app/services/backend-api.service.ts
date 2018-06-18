import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpParams} from "@angular/common/http";
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ViewContainerRef} from '@angular/core';
import { Response} from '@angular/http';

@Injectable()
export class BackendApiService {

    base_url="http://localhost:3000/api/";
    result:any;
    public urlpath;
    options: RequestOptions;
    private changeColorSource = new Subject<any>();
    currentMessage = this.changeColorSource.asObservable();

    constructor(private http: Http ) {

      }


    /* post service */
         postServiceData(path,model,params?)
       {

          let httpParams = new HttpParams();
          let token = localStorage.getItem("token");
            //set the token to header
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('token', token);
            // let myParams = HttpParams().set("params", params);
            let options = new RequestOptions({ headers: headers });
            this.urlpath = this.base_url.concat(path);
            return this.http.post(this.urlpath, model, options)
                             .map(res => res.json());

      }


      /**
      * get service
      */


      getData(path) {
        //get url from the ts and concate it.
        let urlpath = this.base_url.concat(path);
        //get token from the local storage
        let email=localStorage.getItem("email");
        //get token from the local storage
        let token = localStorage.getItem("token");

        console.log( localStorage.getItem("token"));


        //set the token to header
        const headers = new Headers();
        headers.append('token', token);

        //http get call to the server
        return this.http.get(urlpath, { headers: headers })
                          .map((response: Response) => {
                                   let resData = response.json();
                                    return resData;
                              })
      }

      /***********************************
       *** update service
      **********************************/
      updateData(path,data) {
        //var headers = this.getTokenLocalStorage();
        //return this.http.post(this.updateNotesUrl, note, { headers: headers });

         let token = localStorage.getItem("token");
         const headers = new Headers();
         headers.append('token', token);
         this.urlpath= this.base_url.concat(path);
         return this.http.put(this.urlpath,data,{ headers: headers })
         .map(res=>res.json());
      }
      /***********************************
       *** delete service
      **********************************/
      deleteData(path)
      {
        console.log("path", path);
        let token = localStorage.getItem("token");
        const headers = new Headers();
        headers.append('token', token);
        this.urlpath= this.base_url.concat(path);
        return this.http.delete(this.urlpath,{ headers: headers })
        .map(res=>res.json());
      }




}
