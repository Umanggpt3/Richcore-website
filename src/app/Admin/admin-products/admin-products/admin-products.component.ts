import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  form:FormGroup
  private productInfoSub:Subscription;
  public productInfoDisplay:any;
  constructor(public productService:ProductsService) { }

  ngOnInit() {

    this.form = new FormGroup({

         productName: new FormControl(null,{validators:[Validators.required]        
      }),
      productDescription:new FormControl(null,{validators:[Validators.required]        
      }),
    });


    this.productService.getProducts();
    this.productInfoSub = this.productService.getProductUpdateListener().subscribe((productDetails:any)=>{
      console.log("products details protein menu component",productDetails);
      this.productInfoDisplay = productDetails;
    });

    
  }

  onUpdateProductName(productID:any){
    console.log(this.form.value.productDescription,productID);
    this.productService.updateProduct(productID,this.form.value.productName,this.form.value.productDescription);
  }


}
