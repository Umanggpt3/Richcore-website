import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ProductsService} from "../../../Services/products.service";
import { Subscription} from 'rxjs'

@Component({
  selector: 'app-growthfactor',
  templateUrl: './growthfactor.component.html',
  styleUrls: ['./growthfactor.component.css']
})
export class GrowthfactorComponent implements OnInit {

  productInfoDisplay: any[] = [];
  private productSub : Subscription;

  constructor(public productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productService.getGrowthFactors();
    this.productSub = this.productService.getGFListener().subscribe(
      (protiens: any[]) => {
      this.productInfoDisplay = protiens;
    });
  }

  navToProductsInfo(productID: any, productName: string) {
    this.router.navigate(['/growthFactors-info', productID]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
