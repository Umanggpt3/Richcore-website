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

  form:FormGroup;
  public pApplicationArr:any[]=[];
  public pAdvantagesArr:any[]=[];
  public lApplicationArr:any[]=[];
  public lAdvantagesArr:any[]=[];

  public gpApplicationArr:any[]=[];
  public gpAdvantagesArr:any[]=[];
  public glApplicationArr:any[]=[];
  public glAdvantagesArr:any[]=[];

  private productInfoSub:Subscription;
  public productInfoDisplay:any;
  constructor(public productService:ProductsService) { }

  ngOnInit() {

    this.form = new FormGroup({

         productName: new FormControl(null,{validators:[Validators.required]        
      }),
      productDescription:new FormControl(null,{validators:[Validators.required]        
      }),


      papplication:new FormControl(null,{validators:[Validators.required]        
      }),
      proteinName:new FormControl(null,{validators:[Validators.required]        
      }),
      proteinDescription:new FormControl(null,{validators:[Validators.required]        
      }),
      padvantages:new FormControl(null,{validators:[Validators.required]        
      }),
      lapplication:new FormControl(null,{validators:[Validators.required]        
      }),
      ladvantages:new FormControl(null,{validators:[Validators.required]        
      }),


      growthName:new FormControl(null,{validators:[Validators.required]        
      }),
      growthDescription:new FormControl(null,{validators:[Validators.required]        
      }),
      gpapplication:new FormControl(null,{validators:[Validators.required]        
      }),
      gpadvantages:new FormControl(null,{validators:[Validators.required]        
      }),
      glapplication:new FormControl(null,{validators:[Validators.required]        
      }),
      gladvantages:new FormControl(null,{validators:[Validators.required]        
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

  onAddProduct(){
    console.log("application data",this.form.value.padvantages);
    if(this.form.value.papplication)
    {
      this.pApplicationArr = this.form.value.papplication.split(',');
    }
    if(this.form.value.padvantages)
    {
      this.pAdvantagesArr = this.form.value.padvantages.split(',');
    }

    if(this.form.value.lapplication)
    {
      this.lApplicationArr = this.form.value.lapplication.split(',');
    }
    if(this.form.value.ladvantages)
    {
      this.lAdvantagesArr = this.form.value.ladvantages.split(',');
    }





    if(this.form.value.gpapplication)
    {
      this.gpApplicationArr = this.form.value.gpapplication.split(',');
    }
    if(this.form.value.gpadvantages)
    {
      this.gpAdvantagesArr = this.form.value.gpadvantages.split(',');
    }

    if(this.form.value.glapplication)
    {
      this.glApplicationArr = this.form.value.glapplication.split(',');
    }
    if(this.form.value.gladvantages)
    {
      this.glAdvantagesArr = this.form.value.gladvantages.split(',');
    }



    var productObj = {
      protein:{
        proteinName : this.form.value.proteinName,
        proteinDescription:this.form.value.proteinDescription,
        powder: {
            ppAdvantages: this.pAdvantagesArr,
            ppApplication:this.pApplicationArr ,
            ppimagePath:null
        },
          liquid: {
            plAdvantages: this.lAdvantagesArr,
            plApplication:this.lApplicationArr ,
            plimagePath:null
        }
      },
      growthFactor:{
        growthFactorName :this.form.value.growthName,
        growthFactorDescription:this.form.value.growthDescription,
        powder: {
            gpApplication: this.gpApplicationArr,
            gpAdvantages:this.gpAdvantagesArr,
            gpimagePath:null
        },
          liquid: {
            glAdvantages:this.glAdvantagesArr,
            glApplication:this.glApplicationArr,
            glimagePath:null
        }
      }
    }
    console.log("application data",productObj);
    this.productService.addProducts(productObj);

  }
  

}
