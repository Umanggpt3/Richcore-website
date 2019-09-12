import { Component, OnInit } from '@angular/core';

import {HomeInfoService} from '../Services/home-info.service'


import {whyUsInfo} from "../models/whyusinfoModel";
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent implements OnInit {

  private whyusInfoSub :Subscription;
  private whyusInfoDisplay:whyUsInfo;

  constructor(public homeInfoService:HomeInfoService) { }

  ngOnInit() {

      /*****GET WHY US DATA ON INITIALIZATION*******/
      this.homeInfoService.getWhyIUsInfo();
      this.whyusInfoSub = this.homeInfoService.getwhyusUpdateListener().subscribe((whyusDetails:whyUsInfo)=>{
        console.log("IN why us component why us data",whyusDetails);
        this.whyusInfoDisplay = whyusDetails;
      })

  }

  ngAfterViewChecked() {
    $('#pills-tab li p').hover(function() {
      $(this).tab('show');
    });
  }

}
