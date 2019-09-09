import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import {locationInfo} from "../models/locationInfoModel";
import { AdminComponent } from '../Admin/admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class ContactLocationService {

  private locations:locationInfo[] = [];
  private location:locationInfo;
  private id:string=null;
  private locationUpdated = new Subject<locationInfo[]>();


  constructor(private http:HttpClient,private router:Router) { }

  addLocation(location1:string,location2:string,location3:string,location4:string)
  {
   const location:locationInfo= {id:null,location1:location1,location2:location2,location3:location3,location4:location4};
   console.log("in service",location);
   this.http.post<{message:string;locationId:string}>("http://localhost:1025/location/info",location).subscribe(responseData => {
     console.log("responseData",responseData);
     if(responseData["message"]=="success")
        alert("Location Added Successfully");
      location.id = responseData.locationId;
      this.locations=[];
      this.locations.push(location);
      this.locationUpdated.next([...this.locations]);
   });
  }

  getLocation(){
    this.http.get<{message:string,data:any}>("http://localhost:1025/location/info"
    ).pipe(map((locationData)=>{
      return  locationData.data.map(location =>{
        return {
          location1:location.location1,
          location2:location.location2,
          location3:location.location3,
          location4:location.location4,
          _id:location._id
        };
      });
    }))
    .subscribe(responseData => {
        var locationData = responseData;
        this.locations= [];
        this.locations.push(locationData);
        this.locationUpdated.next([...this.locations]);

      
    })
  }

  updateLocation(id:string,location1:string,location2:string,location3:string,location4:string){
    const location:locationInfo= {id:id,location1:location1,location2:location2,location3:location3,location4:location4};
    console.log("in updateLocation",location);
    this.http.put("http://localhost:1025/location/update",location).subscribe(responseData =>{
        if(responseData["status"]=="success")
        {
          var locationData = responseData["data"];
          const updatedLocation = [...this.locations];
          console.log("updated location data",locationData);
          const oldLocationIndex = updatedLocation.findIndex(p => p.id === id);
          updatedLocation[oldLocationIndex]= locationData;
          this.locations = updatedLocation;
          this.locationUpdated.next([...this.locations]);
          alert("Location Updated Successfully");
        }
    })

  }

  deleteLocation(locationID:string){
    this.http.delete("http://localhost:1025/location/" + locationID)
    .subscribe(() => {
      console.log("mskamkasm",this.locations)
     const locationUpdated = this.locations.filter(locationItem => locationItem[0]._id !== locationID);
     this.locations = locationUpdated;
     this.locationUpdated.next([...this.locations]);
    });

  }

  getLocationUpdateListener(){
     return this.locationUpdated.asObservable();
  }
}

