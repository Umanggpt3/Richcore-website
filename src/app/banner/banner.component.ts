import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { homeInfo} from "../models/homeInfoModel";
import {HomeInfoService} from "../Services/home-info.service"
import { RootServiceService } from '../Services/root-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  private homeInfoSub: Subscription;
  private homeInfoDisplay: homeInfo;

  private imagePathInfoSub: Subscription;
  public imagePathInfoDisplay = [];
  private url: any;

  constructor(private homeInfoService: HomeInfoService, private rootService: RootServiceService) {
    this.url = rootService.getURL();
  }


  ngOnInit() {

    this.homeInfoService.getInfo();
    this.homeInfoSub = this.homeInfoService.gethomeUpdateListener().subscribe((homeDetails: homeInfo) => {
      this.homeInfoDisplay = homeDetails;

    });


    this.homeInfoService.getImagepath();
    this.imagePathInfoSub = this.homeInfoService.getImagePathUpdateListener().subscribe((imagePathDetails)=>{
      for (var i=0; i<imagePathDetails[0].length; i++) {
        var imgPath = imagePathDetails[0][i]['imagePath'];
        this.imagePathInfoDisplay.push(this.url + imgPath.toString().substring(20));
      }
      console.log(this.imagePathInfoDisplay);
    });

  }

}
