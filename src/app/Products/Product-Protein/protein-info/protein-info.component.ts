import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router";
import {ProductsService} from "../../../Services/products.service"

@Component({
  selector: 'app-protein-info',
  templateUrl: './protein-info.component.html',
  styleUrls: ['./protein-info.component.css']
})
export class ProteinInfoComponent implements OnInit {

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

  navToProductsInfo(productID:any){
    this.router.navigate(["/products-info",productID]);
  }

}
