import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {HomeInfoService} from '../../Services/home-info.service'
import { Subscription } from 'rxjs';

import {homeInfo} from "../../models/homeInfoModel";
import {whyUsInfo} from "../../models/whyusinfoModel";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form: FormGroup;
  private homeInfoSub : Subscription;
  private homeInfoDisplay:homeInfo;

  private whyusInfoSub :Subscription;
  private whyusInfoDisplay:whyUsInfo;


  constructor(public homeInfoService:HomeInfoService) { }

  ngOnInit() {
    this.form = new FormGroup({

      /*FORM CONTROLS FORHOME INFO SECTION*/
      infoText: new FormControl(null,{validators:[Validators.required]
      }),

      /*FORM CONTROLS FOR WHY-US SECTION*/
      qualityText:new FormControl(null,{validators:[Validators.required]
      }),

      innovationText:new FormControl(null,{validators:[Validators.required]
      }),

      facilityText:new FormControl(null,{validators:[Validators.required]
      }),

      locationText:new FormControl(null,{validators:[Validators.required]
      })

    });

    /*****GET HOME INFO DATA ON INITIALIZATION*******/
    this.homeInfoService.getInfo();
    this.homeInfoSub = this.homeInfoService.gethomeUpdateListener().subscribe((homeDetails:homeInfo)=>{
      console.log("Home details",homeDetails);
      this.homeInfoDisplay = homeDetails;

    })


      /*****GET WHY US DATA ON INITIALIZATION*******/
      this.homeInfoService.getWhyIUsInfo();
      this.whyusInfoSub = this.homeInfoService.getwhyusUpdateListener().subscribe((whyusDetails:whyUsInfo)=>{
        console.log("IN why us component why us data",whyusDetails);
        this.whyusInfoDisplay = whyusDetails;
      })

  }


/*FUNCTION CALL TO SEND HOME SECTION DATA TO SERVICE */

 /* onAddInfo(){
    console.log(this.form.value.infoText)
   this.homeInfoService.addInfo(this.form.value.infoText);

  }*/

/*FUNCTION CALL TO UPDATE HOME SECTION DATA IN  SERVICE */

onUpdateInfo(infoID:string){
  
     this.homeInfoService.updateHomeInfo(infoID,this.form.value.infoText);

  }

/*FUNCTION CALL TO SEND WHY US SECTION DATA TO SERVICE */
  /*onAddWhyUsInfo(){

    this.homeInfoService.addWhyUsInfo(this.form.value.qualityText,this.form.value.innovationText,this.form.value.facilityText,this.form.value.locationText)

  }*/

  onUpdateWhyUsQualityInfo(whyusID:string){
    console.log("why us id",whyusID);
    this.homeInfoService.updateWhyusQualityInfo(whyusID,this.form.value.qualityText);
  }

  onUpdateWhyUsInnovationInfo(whyusID:string){
    console.log("why us id",whyusID);
    this.homeInfoService.updateWhyusInnovationInfo(whyusID,this.form.value.innovationText);
  }

  onUpdateWhyUsFacilityInfo(whyusID:string){
    console.log("why us id",whyusID);
    this.homeInfoService.updateWhyusFacilityInfo(whyusID,this.form.value.facilityText);
  }

  onUpdateWhyUsLocationInfo(whyusID:string){
    console.log("why us id",whyusID);
    this.homeInfoService.updateWhyusLocationInfo(whyusID,this.form.value.locationText);
  }

}
