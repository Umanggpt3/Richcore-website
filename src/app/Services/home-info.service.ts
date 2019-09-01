import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

import {homeInfo} from "../models/homeInfoModel"



@Injectable({
  providedIn: 'root'
})
export class HomeInfoService {

  // private homeInfoUpdated = new Subject<string>();

  homeDetails:homeInfo;
  constructor(private http: HttpClient) { }

  addInfo(homeInfo:string){
   console.log("In service ",homeInfo);
   const homeDetails = {data:homeInfo,id:null}
   this.http.post("http://localhost:1025/home/info",this.homeDetails).subscribe(responseData => {
     console.log(responseData);
   });
  }
}
