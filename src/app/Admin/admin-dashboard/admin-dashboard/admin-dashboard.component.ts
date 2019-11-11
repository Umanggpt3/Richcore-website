import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  navtoloc(){
    this.router.navigate(['/admin-location']);
  }

  navtohome(){
    this.router.navigate(['/admin']);
  }
  navToProductAdmin(){
    this.router.navigate(['/admin-product']);

  }

}
