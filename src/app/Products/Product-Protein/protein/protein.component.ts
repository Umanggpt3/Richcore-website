import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ProductsService} from "../../../Services/products.service";
import { Subscription} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-protein',
  templateUrl: './protein.component.html',
  styleUrls: ['./protein.component.css']
})
export class ProteinComponent implements OnInit {
  productInfoDisplay: any[] = [];
  private productSub: Subscription;
  growthInfoDisplay: any[] = [];
  private gproductSub: Subscription;

  constructor(public productService: ProductsService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.spinner.show();
    this.productInfoDisplay = this.productService.getSavedProtiens();
    this.growthInfoDisplay = this.productService.getSavedGrowthFactors();
    console.log(this.productInfoDisplay.length + 'protiensCOmps');
    if (this.productInfoDisplay.length === 0) {
      this.spinner.show();
      this.productService.getProtien();
      this.productSub = this.productService.getProtineListener().subscribe(
        (protiens: any[]) => {
        this.productInfoDisplay = protiens;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      });
      this.productService.getGrowthFactors();
      this.gproductSub = this.productService.getGFListener().subscribe(
        (gfs: any[]) => {
        this.growthInfoDisplay = gfs;
      });
    }
  }

  navToGProductsInfo(productID: any) {
    this.router.navigate(['/growthFactors-info', productID]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  navToProductsInfo(productID: any) {
    this.router.navigate(['/products-info', productID]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
