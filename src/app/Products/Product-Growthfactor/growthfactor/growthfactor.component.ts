import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import {ProductsService} from "../../../Services/products.service"

@Component({
  selector: 'app-growthfactor',
  templateUrl: './growthfactor.component.html',
  styleUrls: ['./growthfactor.component.css']
})
export class GrowthfactorComponent implements OnInit {

  productInfoDisplay: any = [];
  private productSub : Subscription;
  constructor(public productService: ProductsService,private router:Router) { }

  ngOnInit() {
      this.productService.getProducts();
      this.productSub = this.productService.getProductUpdateListener().subscribe((productDetails:any[]) => {
      console.log("productInfoDisplay cards",productDetails);
      this.productInfoDisplay = productDetails
    })

  }

  navToGrowthInfo(productID:any){
    this.router.navigate(["/growth-info",productID]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


}
