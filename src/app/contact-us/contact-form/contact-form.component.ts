import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";

import {ContactLocationService} from "../../Services/contact-location.service"
import {locationInfo} from "../../models/locationInfoModel"
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  locationDisplay:locationInfo[] = [];
  private locationSub : Subscription;
  constructor(public locationService:ContactLocationService,private route:Router) { }

  ngOnInit() {
    this.locationService.getLocation();
    this.locationSub = this.locationService.getLocationUpdateListener().subscribe((locationDetails:locationInfo[])=>{
      console.log("location details",locationDetails);
      this.locationDisplay = locationDetails;
    })
  }

}
