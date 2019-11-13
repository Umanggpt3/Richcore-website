import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { from } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navtoabout(){
    this.router.navigate(['/about']);
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }

  navtocontact(){
    this.router.navigate(['/contact']);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  navToProducts(){
    this.router.navigate(['/products']);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  navToHome(){
    this.router.navigate(['/']);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
