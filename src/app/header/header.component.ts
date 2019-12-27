import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productInfoDisplay: any[] = [];
  private productSub: Subscription;
  growthInfoDisplay: any[] = [];
  private gproductSub: Subscription;

  constructor(public router: Router, public productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProtien();
    this.productService.getGrowthFactors();
  }

  navtoabout() {
    this.router.navigate(['/about']);
  }

  navtoadmin() {
    this.router.navigate(['/admin']);
  }

  navtohome() {
    this.router.navigate(['/']);

  }
  navtocontact() {
    this.router.navigate(['/contact']);
  }
  navtoproducts() {
    this.router.navigate(['/products']);
  }

}
