import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router";
import {ProductsService} from "../../../Services/products.service"
import { NgxSpinnerService } from 'ngx-spinner';

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
  public productName: String;

  public product: any;
  public limage: any;
  public pimage: any;
  public initActive: any = 0;
  public vwidth: number;

  public protiens: any[] = [];
  // public gowthFactors: any[] = [];

  constructor(
      public productService: ProductsService,
      private route: ActivatedRoute,
      private router: Router,
      private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.routesub = this.route.params.subscribe(params => {
        this.productID = params.productID;
        console.log(params);
        const ind = params.index;
        // this.initActive = ind;
        this.protiens = this.productService.getSavedProtiens();
        if (this.protiens.length === 0) {
          this.spinner.show();
          this.productService.getProtien();
          this.productSub = this.productService.getProtineListener().subscribe(
            (protiens: any[]) => {
            this.protiens = protiens;
            this.product = this.protiens.filter(item => item._id === this.productID)[0];
            this.vwidth = 100 / this.product.length;
            setTimeout(() => {
              this.spinner.hide();
              this.setToActive(ind);
              if (this.product.liquid.plApplication.length !== 0) {
                document.getElementById('lliquid-tab').classList.add('activeTab');
              } else {
                document.getElementById('lpowder-tab').classList.add('activeTab');
              }
            }, 1000);
          });
        } else {
          this.product = this.protiens.filter(item => item._id === this.productID)[0];
          setTimeout(() => {
            this.setToActive(ind);
            if (this.product.powder.ppApplication.length !== 0) {
              document.getElementById('powder-tab').classList.add('active');
              document.getElementById('powder-tab').classList.add('show');
              document.getElementById('powder').classList.add('active');
              document.getElementById('powder').classList.add('show');
              this.addblueBorder('lpowder-tab');
              if (this.product.liquid.plApplication.length !== 0) {
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


  addblueBorder(id: string) {
    document.getElementById(id).classList.add('activeTab');
    if (id === 'lpowder-tab') {
      document.getElementById('lliquid-tab').classList.remove('activeTab');
    } else {
      document.getElementById('lpowder-tab').classList.remove('activeTab');
    }
  }

  navToProductsInfo(productID: any, product: any) {
    this.product  = product;
    this.router.navigate(['/products-info' , productID]);
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
