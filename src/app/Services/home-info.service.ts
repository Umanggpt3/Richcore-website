import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject, from } from 'rxjs';
import { Router } from "@angular/router";

import {homeInfo} from "../models/homeInfoModel"
import {whyUsInfo} from "../models/whyusinfoModel"
import { FormControl } from '@angular/forms';
import {imagePathInfo} from "../models/imagePathModel"
import { map } from 'rxjs/operators';
import { RootServiceService } from './root-service.service';



@Injectable({
  providedIn: 'root'
})

export class HomeInfoService {

  private imagePathDetails:imagePathInfo[]=[];
  imagePath:imagePathInfo;
  private imagePathUpdated = new Subject<any>();

  private homeInfoDetails:homeInfo;
  homeDetails:homeInfo;
  private homeInfoUpdated = new Subject<homeInfo>();

  private whyusInfoDetails:whyUsInfo;
  whyusDetails:whyUsInfo;
  private whyusInfoUpdated = new Subject<whyUsInfo>();

  private url: any;

  constructor(private http: HttpClient, private rootService: RootServiceService) {
    this.url = rootService.getUrlwithPort();
  }

uploadImage(image:File){
  console.log("Image data in service", image)
  const imageData = new FormData();
   imageData.append("image",image);
   console.log("Image data in service", imageData)

   this.http.post<{message:string,imageID:string,imagePath:string}>(this.url + "/home/uploadImage",imageData).subscribe(responseData =>{
     console.log("Image upload response data",responseData);
     alert("image updated successfully")
   })
}

updateImage(imageID:string,image:File){
  console.log("Image data in service", image)
  const imageData = new FormData();
  imageData.append("id",imageID)
  imageData.append("image",image);
  this.http.put(this.url + "/home/imageUpdate",imageData).subscribe(responseData =>{
    console.log("response data in update image function",responseData);
    alert("Successfully updated image");
  })
}

deleteImage(imageID:string){
  this.http.delete(this.url + "/home/"+ imageID).subscribe(()=>{
    console.log("image deleted");
    alert("image deleted");
  })
}

getImagepath(){
  this.http.get(this.url + "/home/imagePath").subscribe(ImageData =>{
    console.log("inside getImagePath in service",ImageData);

   var imagePathData = ImageData;
    this.imagePathDetails = Object.values(ImageData);
   console.log("inside getImagePath in service",this.imagePathDetails);
    this.imagePathUpdated.next(this.imagePathDetails);

  })
}


/*FUNCTION TO ADD HOME DATA TO DATABASE */

  /*addInfo(homeInfo:string){
   console.log("In service ",homeInfo);
   const homeDetails:homeInfo = {id:null,data:homeInfo}
   console.log("In service homeDetails ",homeDetails);

   this.http.post<{message:string;dataID:string}>(this.url + "/home/info",homeDetails).subscribe(responseData => {
     console.log(responseData);
     homeDetails.id = responseData.dataID;
   });
  }*/

  /*FUNCTION TO GET HOME DATA FROM DATABASE */

  getInfo(){
    this.http.get(this.url + "/home/info").subscribe(responseData =>{
      console.log("Response Data",responseData);
      var homeDetails = responseData["data"];
      console.log("Response Data 2",homeDetails);
      this.homeInfoDetails = homeDetails;
      this.homeInfoUpdated.next(this.homeInfoDetails);

    })
  }

   /*FUNCTION TO UPDATE HOME DATA IN DATABASE */


  updateHomeInfo(id:string,data:string){
    const homeDetails:homeInfo = {id:id,data:data};
    console.log("in updateHomeInfo",homeDetails);

    this.http.put(this.url + "/home/update",homeDetails).subscribe(responseData =>{
        console.log("After info update",responseData);
        if(responseData["status"]=="success")
        {
          console.log("response data in updateeeeeeeee",responseData)
          alert("Information Updated Successfully");
        }
        else{
          alert("Fail to update data");
        }
    })

  }

  gethomeUpdateListener(){
    return this.homeInfoUpdated.asObservable();

 }


 /*FUNCTION TO ADD WHY-US DATA TO DATABASE */
 
 addWhyUsInfo(qualityInfo:string,innovationInfo:string,facilityInfo:string,locationInfo:string){
  console.log("In service ",qualityInfo);
  const whyusDetails:whyUsInfo = {id:null,quality:qualityInfo,innovation:innovationInfo,facility:facilityInfo,location:locationInfo}
  console.log("In service whyusDetails ",whyusDetails);

  this.http.post<{message:string;dataID:string}>(this.url + "/home/whyus",whyusDetails).subscribe(responseData => {
    console.log(responseData);
    whyusDetails.id = responseData.dataID;
    console.log("response data");
  });
 }


 getWhyIUsInfo(){
  this.http.get(this.url + "/home/whyus").subscribe(responseData =>{
    console.log("Response Data of WHY US",responseData);
    var whyusDetails = responseData["data"];
    console.log("Response Data 2",whyusDetails);
    this.whyusInfoDetails = whyusDetails;
    this.whyusInfoUpdated.next(this.whyusInfoDetails);

  })
}


  /*FUNCTION TO UPDATE WHY US QUALITY DATA IN DATABASE */


  updateWhyusQualityInfo(id:string,qualityInfo:string){
    const whyusQualityInfo:any = {id:id,quality:qualityInfo};
    console.log("in updatequality Info",whyusQualityInfo);

    this.http.put(this.url + "/home/update-quality",whyusQualityInfo).subscribe(responseData =>{
        console.log("After qualityinfo update",responseData);
        if(responseData["status"]=="success")
        {
          var whyusQualityInfoResponse:whyUsInfo = responseData["data"];

          alert("Information Updated Successfully");
        }
    })
  }

    /*FUNCTION TO UPDATE WHY US INNOVATION DATA IN DATABASE */


    updateWhyusInnovationInfo(id:string,innovationInfo:string){
      const whyusInnovationInfo:any = {id:id,innovation:innovationInfo};
      console.log("in updateInnovation Info",whyusInnovationInfo);

  
      this.http.put(this.url + "/home/update-innovation",whyusInnovationInfo).subscribe(responseData =>{
          if(responseData["status"]=="success")
          {
            var whyusQualityInfoResponse:whyUsInfo = responseData["data"];
            alert("Information Updated Successfully");
          }
      })
    }

       /*FUNCTION TO UPDATE WHY US FACILITY DATA IN DATABASE */


       updateWhyusFacilityInfo(id:string,facilityInfo:string){
        const whyusFacilitynInfo:any = {id:id,facility:facilityInfo};
  
    
        this.http.put(this.url + "/home/update-facility",whyusFacilitynInfo).subscribe(responseData =>{
            if(responseData["status"]=="success")
            {
              var whyusFacilityInfoResponse:whyUsInfo = responseData["data"];
              alert("Information Updated Successfully");
            }
        })
      }
  
             /*FUNCTION TO UPDATE WHY US LOCATION DATA IN DATABASE */


             updateWhyusLocationInfo(id:string,locationInfo:string){
              const whyusLocationInfo:any = {id:id,location:locationInfo};
        
              console.log("in update why us loation",whyusLocationInfo)
              this.http.put(this.url + "/home/update-location",whyusLocationInfo).subscribe(responseData =>{
                  if(responseData["status"]=="success")
                  {
                    var whyusLocationInfoResponse:whyUsInfo = responseData["data"];
                    alert("Information Updated Successfully");
                  }
              })
            }
        

getwhyusUpdateListener(){
  return this.whyusInfoUpdated.asObservable();

}

getImagePathUpdateListener(){
  return this.imagePathUpdated.asObservable();
}


}
