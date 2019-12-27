import { Injectable } from '@angular/core';
import {contactusMail} from "../models/contactusMailModel"
import { HttpClient } from "@angular/common/http";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private http: HttpClient) { }
//18.223.232.75:1035
  contactMail(contactData:contactusMail){
    console.log("in contact us service ",contactData);
   return this.http.post(
      "http://localhost:1035/mail/contactUs",contactData);

  }
}
