import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";
import {ProductsService} from "../../../Services/products.service"

@Component({
  selector: 'app-protein-menu',
  templateUrl: './protein-menu.component.html',
  styleUrls: ['./protein-menu.component.css']
})
export class ProteinMenuComponent implements OnInit {

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

  navToProductsInfo(productID:any){
    console.log("kajskajsakjsa",productID)
    this.router.navigate(["/products-info",productID])

  }

}
