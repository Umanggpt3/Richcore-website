import { Component, OnInit } from '@angular/core';
import { Subscription, from} from 'rxjs'
import { Router } from "@angular/router";

import {ContactLocationService} from "../../Services/contact-location.service"
import {MailServiceService} from "../../Services/mail-service.service"
import {locationInfo} from "../../models/locationInfoModel"
import {contactusMail} from "../../models/contactusMailModel"
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  form:FormGroup;

  locationDisplay:locationInfo[]=[];
  private locationSub : Subscription;
  constructor(public locationService:ContactLocationService,private route:Router,public mailService:MailServiceService) { }

  ngOnInit() {

    this.form = new FormGroup({

      userName: new FormControl(null,{validators:[Validators.required]
      }),

      userMail:new FormControl(null,{validators:[Validators.required]
      }),

      userNum:new FormControl(null,{validators:[Validators.required]
      }),

      userCompany:new FormControl(null,{validators:[Validators.required]
      }),

      userMessage:new FormControl(null,{validators:[Validators.required]
      })

    });



    this.locationService.getLocation();
    this.locationSub = this.locationService.getLocationUpdateListener().subscribe((locationDetails:locationInfo[])=>{
      this.locationDisplay = locationDetails;
    })
  }

  sendMail(){
    console.log(this.form.value.userName);
    console.log(this.form.value.userNum);
    console.log(this.form.value.userMail);  
    console.log(this.form.value.userCompany);
    console.log(this.form.value.userMessage);
    const contactData= {
      userName:this.form.value.userName,
      userNum:this.form.value.userNum,
      userMail:this.form.value.userMail,
      userCompany:this.form.value.userCompany,
      userMessage:this.form.value.userMessage
    } 

    console.log(contactData);
    this.mailService.contactMail(contactData)
    

  }

}
