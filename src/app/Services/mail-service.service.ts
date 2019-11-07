import { Injectable } from '@angular/core';
import {contactusMail} from "../models/contactusMailModel"
import { HttpClient } from "@angular/common/http";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private http: HttpClient) { }

  contactMail(contactData:contactusMail){
    console.log("in contact us service ",contactData);
    this.http.post(
      "http://3.15.155.27:1035/mail/contactUs",contactData).subscribe(responseData =>{
        console.log(responseData);
      })

  }
}
