import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";
import {ProductsService} from "../../../Services/products.service";

@Component({
  selector: 'app-protein-menu',
  templateUrl: './protein-menu.component.html',
  styleUrls: ['./protein-menu.component.css']
})
export class ProteinMenuComponent implements OnInit {

  productInfoDisplay: any[] = [];
  private productSub : Subscription;

  constructor(public productService: ProductsService,private router: Router) { }

  ngOnInit() {
    this.productService.getProtien();
    this.productSub = this.productService.getProtineListener().subscribe(
      (protiens: any[]) => {
      this.productInfoDisplay = protiens;
    });
  }

  navToProductsInfo(productID: any, productName: string) {
    this.router.navigate(['/products-info', productID]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
