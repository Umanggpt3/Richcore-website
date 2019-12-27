import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription} from 'rxjs';
import { ProductsService } from '../Services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-groth-facotor-display',
  templateUrl: './groth-facotor-display.component.html',
  styleUrls: ['./groth-facotor-display.component.css']
})
export class GrothFacotorDisplayComponent implements OnInit {
  productInfoDisplay: any;
  private productSub: Subscription;
  private productID: string;
  private routesub: Subscription;
  public productInfo: any = [];
  public productName: string;
  public product: any;
  public protiens: any[];

  constructor(
            public productService: ProductsService,
            private router: Router,
            private route: ActivatedRoute,
            private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.routesub = this.route.params.subscribe(params => {
      this.productID = params.productID;
      this.protiens = this.productService.getSavedGrowthFactors();
      if (this.protiens.length === 0) {
          this.spinner.show();
          this.productService.getGrowthFactors();
          this.productSub = this.productService.getGFListener().subscribe(
            (protiens: any[]) => {
            this.protiens = protiens;
            this.product = this.protiens.filter(item => item._id === this.productID)[0];
            setTimeout(() => {
              this.spinner.hide();
            }, 500);
          });
        } else {
          this.product = this.protiens.filter(item => item._id === this.productID)[0];
        }
    });
  }

  navToProductsInfo(productID: any, product: any) {
    this.product  = product;
    this.router.navigate(['/growthFactors-info' , productID]);
  }

}
