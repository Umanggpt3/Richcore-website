import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {HomeInfoService} from '../../Services/home-info.service'
import { Subscription, from } from 'rxjs';

import {homeInfo} from "../../models/homeInfoModel";
import {whyUsInfo} from "../../models/whyusinfoModel";
import {mimeType} from "./mime-type.validator";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form: FormGroup;
  imagePreview:string;

  private imagePathInfoSub :Subscription;
  private imagePathInfoDisplay:any;

  private homeInfoSub : Subscription;
  private homeInfoDisplay:homeInfo;

  private whyusInfoSub :Subscription;
  private whyusInfoDisplay:whyUsInfo;


  constructor(public homeInfoService:HomeInfoService) { }

  ngOnInit() {
    this.form = new FormGroup({

      image: new FormControl(null,{validators:[Validators.required],asyncValidators:[mimeType]}),
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

    this.homeInfoService.getImagepath();
    this.imagePathInfoSub = this.homeInfoService.getImagePathUpdateListener().subscribe((imagePathDetails)=>{
      console.log("Image path details admin ts file",imagePathDetails);
      this.imagePathInfoDisplay = imagePathDetails;

    })


      /*****GET WHY US DATA ON INITIALIZATION*******/
      this.homeInfoService.getWhyIUsInfo();
      this.whyusInfoSub = this.homeInfoService.getwhyusUpdateListener().subscribe((whyusDetails:whyUsInfo)=>{
        console.log("IN why us component why us data",whyusDetails);
        this.whyusInfoDisplay = whyusDetails;
      })

  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file); 
  }

  onUpdateImage(imageID:string){
    this.homeInfoService.updateImage(imageID,this.form.value.image);
  }
  onDeleteImage(imageID:string){
    this.homeInfoService.deleteImage(imageID);
  }

  onAddImage(){
    this.homeInfoService.uploadImage(this.form.value.image)
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
  onAddWhyUsInfo(){

    this.homeInfoService.addWhyUsInfo(this.form.value.qualityText,this.form.value.innovationText,this.form.value.facilityText,this.form.value.locationText)

  }


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
