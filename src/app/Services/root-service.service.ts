import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootServiceService {

  private url: string;
  private port: string;

  constructor() {
    this.url = 'http://13.234.255.152';
    this.port = '1039';
  }

  getUrlwithPort() {
    return this.url + ':' + this.port;
  }

  getURL() {
    return this.url;
  }

}
