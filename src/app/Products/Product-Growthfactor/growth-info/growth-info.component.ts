import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router";
import {ProductsService} from "../../../Services/products.service"

@Component({
  selector: 'app-growth-info',
  templateUrl: './growth-info.component.html',
  styleUrls: ['./growth-info.component.css']
})
export class GrowthInfoComponent implements OnInit {

  productInfoDisplay:any;
  private productSub : Subscription;
  private productID:string;
  private routesub:Subscription;
  public productInfo:any =[]

  constructor(public productService: ProductsService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.routesub = this.route.params.subscribe(params => {
      console.log("params",params);
      this.productID = params.productID;
      this.productService.getProduct(this.productID);
      this.productSub = this.productService.getproductdetailsUpdateListener().subscribe((productDetails:any[]) => {
      console.log("productInfoDisplay cards asasasasasas",productDetails);
      this.productInfoDisplay = productDetails
    })

    })

    this.productService.getProducts();
    this.productSub = this.productService.getProductUpdateListener().subscribe((productDetails:any[]) => {
      console.log("productInfoDisplay cards",productDetails);
      this.productInfo = productDetails
    })
  }

  navToGrowthInfo(productID:any){
    this.router.navigate(["/growth-info",productID]);
  }

  navToAboutUs(){
    this.router.navigate(["/about"]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
