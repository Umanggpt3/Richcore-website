import { Component, OnInit, HostListener } from '@angular/core';
import { HomeInfoService } from '../Services/home-info.service';
import { whyUsInfo } from '../models/whyusinfoModel';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent implements OnInit {

  private whyusInfoSub: Subscription;
  public whyusInfoDisplay: whyUsInfo;

  public ismobile: boolean;

  constructor(
    public homeInfoService: HomeInfoService,
  ) {
    this.ismobile = true;
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.ismobile = window.innerWidth > 768;
        console.log(this.ismobile);
    }

  ngOnInit() {

      /*****GET WHY US DATA ON INITIALIZATION*******/
      this.homeInfoService.getWhyIUsInfo();
      this.whyusInfoSub = this.homeInfoService.getwhyusUpdateListener().subscribe((whyusDetails:whyUsInfo)=>{
        console.log("IN why us component why us data",whyusDetails);
        this.whyusInfoDisplay = whyusDetails;
        // console.log('quality: ', this.whyusInfoDisplay[0].quality);
      });

  }

  ngAfterViewChecked() {
    $('#pills-tab li p').hover(function() {
      $(this).tab('show');
    });
  }
}
