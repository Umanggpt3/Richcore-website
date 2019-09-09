import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {locationInfo} from "../../models/locationInfoModel";
import {ContactLocationService} from "../../Services/contact-location.service";
import { ActivatedRoute } from '@angular/router';

import { Router } from "@angular/router";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.css']
})
export class AdminLocationComponent implements OnInit {

  form:FormGroup;
  locationDisplay:locationInfo[] = [];
  private locationSub : Subscription;

  constructor(public locationService:ContactLocationService,public route :ActivatedRoute) { }

  ngOnInit() {

    this.locationService.getLocation();
    this.locationSub = this.locationService.getLocationUpdateListener().subscribe((locationDetails:locationInfo[])=>{
      this.locationDisplay = locationDetails;

    })

    this.form = new FormGroup({
      location1: new FormControl(null,{validators:[Validators.required]
      }),
  
      location2: new FormControl(null,{validators:[Validators.required]
      }),
      
      location3: new FormControl(null,{validators:[Validators.required]
      }),
      
      location4: new FormControl(null,{validators:[Validators.required]
      }),
  
    });


    


  }

  onUpdateLocation(locationID:string,){

   this.locationService.updateLocation(locationID, this.form.value.location1, this.form.value.location2, this.form.value.location3,
    this.form.value.location4);
  
  }



//Code to add new location to database

  onAddLocation(){
    console.log(this.form.value.location1);
    console.log(this.form.value.location2);
    console.log(this.form.value.location3);

    if(this.form.invalid) {
     return;
    }   
    
    this.locationService.addLocation(
      this.form.value.location1,
      this.form.value.location2,
      this.form.value.location3,
      this.form.value.location4
    )

  }
 
  onDeleteLocation(locationID:string){
    this.locationService.deleteLocation(locationID);
  }

}
