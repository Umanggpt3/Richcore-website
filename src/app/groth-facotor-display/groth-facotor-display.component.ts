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
  public initActive: any = 0;

  constructor(
            public productService: ProductsService,
            private router: Router,
            private route: ActivatedRoute,
            private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.routesub = this.route.params.subscribe(params => {
      const ind = params.index;
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
              if (!document.getElementById('navbtns').classList.contains('collapsed')) {
                document.getElementById('navbtns').classList.add('collapsed');
                document.getElementById('navbarNavDropdown').classList.remove('show');
                document.getElementById('navbarNavDropdown').classList.remove('in');
              }
              this.spinner.hide();
              this.setToActive(ind);
              if (this.product.liquid.glApplication.length !== 0) {
                document.getElementById('lliquid-tab').classList.add('activeTab');
              } else {
                document.getElementById('lpowder-tab').classList.add('activeTab');
              }
            }, 500);
          });
        } else {
          this.product = this.protiens.filter(item => item._id === this.productID)[0];
          setTimeout(() => {
            if (!document.getElementById('navbtns').classList.contains('collapsed')) {
              document.getElementById('navbtns').classList.add('collapsed');
              document.getElementById('navbarNavDropdown').classList.remove('show');
              document.getElementById('navbarNavDropdown').classList.remove('in');
            }
            this.setToActive(ind);
            if (this.product.powder.gpApplication.length !== 0) {
              document.getElementById('powder-tab').classList.add('active');
              document.getElementById('powder-tab').classList.add('show');
              document.getElementById('powder').classList.add('active');
              document.getElementById('powder').classList.add('show');
              this.addblueBorder('lpowder-tab');
              if (this.product.liquid.glApplication.length !== 0) {
                document.getElementById('liquid-tab').classList.remove('active');
                document.getElementById('liquid-tab').classList.remove('show');
                document.getElementById('liquid').classList.remove('active');
                document.getElementById('liquid').classList.remove('show');
              }
            } else {
              document.getElementById('liquid-tab').classList.add('active');
              document.getElementById('liquid-tab').classList.add('show');
              document.getElementById('liquid').classList.add('active');
              document.getElementById('liquid').classList.add('show');
              this.addblueBorder('lliquid-tab');
              if (this.product.powder.ppApplication.length !== 0) {
                document.getElementById('powder-tab').classList.remove('active');
                document.getElementById('powder-tab').classList.remove('show');
                document.getElementById('powder').classList.remove('active');
                document.getElementById('powder').classList.remove('show');
              }
            }
          }, 100);
        }
    });
  }

  navToProductsInfo(productID: any, product: any) {
    this.product  = product;
    this.router.navigate(['/growthFactors-info' , productID]);
  }

  addblueBorder(id: string) {
    if (!document.getElementById('typebtn').classList.contains('collapsed')) {
      document.getElementById('typebtn').classList.add('collapsed');
      document.getElementById('navbarNavDropdowns').classList.remove('show');
      document.getElementById('navbarNavDropdowns').classList.remove('in');
    }
    document.getElementById(id).classList.add('activeTab');
    if (id === 'lpowder-tab') {
      document.getElementById('lliquid-tab').classList.remove('activeTab');
    } else {
      document.getElementById('lpowder-tab').classList.remove('activeTab');
    }
  }

  setToActive(j: any) {
    document.getElementById('tab' + this.initActive).classList.remove('activeTab');
    document.getElementById('tab' + this.initActive).classList.add('nactiveTab');
    document.getElementById('atab' + this.initActive).classList.remove('aactiveTab');
    document.getElementById('atab' + this.initActive).classList.add('anactiveTab');
    this.initActive = j;
    document.getElementById('tab' + j).classList.add('activeTab');
    document.getElementById('tab' + j).classList.remove('nactiveTab');
    document.getElementById('atab' + j).classList.remove('anactiveTab');
    document.getElementById('atab' + j).classList.add('aactiveTab');
  }

}
