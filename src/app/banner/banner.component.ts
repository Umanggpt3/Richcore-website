import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { homeInfo} from "../models/homeInfoModel";
import {HomeInfoService} from "../Services/home-info.service"

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  private homeInfoSub : Subscription;
  private homeInfoDisplay:homeInfo;

  private imagePathInfoSub :Subscription;
  public imagePathInfoDisplay:any;

  constructor(private homeInfoService:HomeInfoService) { }


  ngOnInit() {

    this.homeInfoService.getInfo();
    this.homeInfoSub = this.homeInfoService.gethomeUpdateListener().subscribe((homeDetails:homeInfo)=>{
      this.homeInfoDisplay = homeDetails;

    });


    this.homeInfoService.getImagepath();
    this.imagePathInfoSub = this.homeInfoService.getImagePathUpdateListener().subscribe((imagePathDetails)=>{
      console.log("Image path details admin ts file",imagePathDetails);
      this.imagePathInfoDisplay = imagePathDetails;

    })

  }

}
