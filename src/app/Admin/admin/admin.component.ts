import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {HomeInfoService} from '../../Services/home-info.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form: FormGroup;

  constructor(public homeInfoService:HomeInfoService) { }

  ngOnInit() {
    this.form = new FormGroup({
      infoText: new FormControl(null,{validators:[Validators.required]
      }),
    });

  }

  onAddInfo(){
   
    console.log(this.form.value.infoText)
   this.homeInfoService.addInfo(this.form.value.infoText);

  }

}
