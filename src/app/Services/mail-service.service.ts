import { Injectable } from '@angular/core';
import {contactusMail} from "../models/contactusMailModel"
import { HttpClient } from "@angular/common/http";
import { from } from 'rxjs';
import { RootServiceService } from './root-service.service';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  private url: any;

  constructor(private http: HttpClient, private rootService: RootServiceService) {
    this.url = rootService.getUrlwithPort();
  }
  contactMail(contactData: contactusMail) {
    console.log('in contact us service ', contactData);
    return this.http.post(this.url + '/mail/contactUs', contactData);
  }
}
