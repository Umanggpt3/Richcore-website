import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import {locationInfo} from "../models/locationInfoModel";

@Injectable({
  providedIn: 'root'
})
export class ContactLocationService {

  private locations:locationInfo[] = [];
  private location:locationInfo;
  private id:string=null;
  private locationUpdated = new Subject<locationInfo[]>();


  constructor(private http:HttpClient,private router:Router) { }

  addLocation(location1:string,location2:string,location3:string)
  {
   const location:locationInfo= {id:null,location1:location1,location2:location2,location3:location3};
   console.log("in service",location);
   this.http.post<{message:string;locationId:string}>("http://localhost:1025/location/info",location).subscribe(responseData => {
     console.log("responseData",responseData);
      location.id = responseData.locationId;
      this.locations.push(location);
      this.locationUpdated.next([...this.locations]);
   })
  }

  getLocation(){
    this.http.get("http://localhost:1025/location/info").subscribe(responseData => {
      if(responseData["status"]== "success"){
        console.log("getLocation response",responseData)
        var locationData = responseData["data"];
        this.locations.push(locationData);
        this.locationUpdated.next([...this.locations]);

      }
    })
  }

  getLocationUpdateListener(){
     return this.locationUpdated.asObservable();
  }
}

