import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  navtoabout(){
    this.router.navigate(['/about']);
  }

  navtoadmin(){
    this.router.navigate(['/admin']);
  }

  navtohome(){
    this.router.navigate(['/']);

  }
  navtocontact(){
    this.router.navigate(['/contact']);
  }
  navtoproducts(){
    this.router.navigate(['/products']);
  }

}
