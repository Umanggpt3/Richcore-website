import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { ProductsService } from '../Services/products.service';
import {MailServiceService} from '../Services/mail-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  form: FormGroup;
  productInfoDisplay: any[] = [];
  private productSub: Subscription;
  growthInfoDisplay: any[] = [];
  private gproductSub: Subscription;

  constructor(public router: Router,
              public productService: ProductsService,
              public mailerService: MailServiceService,
              private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      userEmail: new FormControl(null, {validators: [Validators.required]})
    });
    this.productService.getProtien();
    this.productService.getGrowthFactors();
  }

  navtoabout() {
    this.hidenav();
    this.router.navigate(['/about']);
  }

  navtoadmin() {
    this.hidenav();
    this.router.navigate(['/admin']);
  }

  sendMailFromheader() {
    this.spinner.show();
    const contactData = {
      userName: 'Default',
      userNum: 'Default',
      userMail: this.form.value.userEmail,
      userCompany: 'Default',
      userMessage: 'This mail was sent since user clicked on know more from header of the Richcore Website'
    };
    this.mailer(contactData);
  }

  mailer(contactData: any) {
    this.mailerService.contactMail(contactData).subscribe((reponse) => {
      this.spinner.hide();
      if (reponse['status'] === 'success') {
        alert(reponse['message']);
        this.form.reset();
      } else {
        alert('Failed to send the mail');
      }
    });
  }

  navtohome() {
    this.hidenav();
    this.router.navigate(['/']);

  }
  navtocontact() {
    this.hidenav();
    this.router.navigate(['/contact']);
  }
  navtoproducts() {
    this.hidenav();
    this.router.navigate(['/products']);
  }

  hidenav() {
    if (!document.getElementById('headnavbtn').classList.contains('collapsed')) {
      document.getElementById('headnavbtn').classList.add('collapsed');
      document.getElementById('navbarSupportedContent').classList.remove('show');
      document.getElementById('navbarSupportedContent').classList.remove('in');
    }
  }

}
