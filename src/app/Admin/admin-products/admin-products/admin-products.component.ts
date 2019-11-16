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

  public ppApplicationUpdated:any[]=[];
  public ppAdvantageUpdated:any[]=[];
  public plAdvantageUpdated:any[]=[];
  public plApplicationUpdated:any[]=[];

  public gpApplicationUpdated:any[]=[];
  public gpAdvantageUpdated:any[]=[];
  public glAdvantageUpdated:any[]=[];
  public glApplicationUpdated:any[]=[];

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

      proteinPowderAdvantage:new FormControl(null,{validators:[Validators.required]        
      }),
      proteinPowderApplication:new FormControl(null,{validators:[Validators.required]        
      }),

      proteinPowderApllicationUpdate:new FormControl(null,{validators:[Validators.required]        
      }),
      proteinPowderAdvantageUpdate:new FormControl(null,{validators:[Validators.required]        
      }),

      proteinLiquidAdvantageUpdate:new FormControl(null,{validators:[Validators.required]        
      }),
      proteinLiquidApllicationUpdate:new FormControl(null,{validators:[Validators.required]        
      }),
      proteinLiquidAdvantage:new FormControl(null,{validators:[Validators.required]        
      }),
      proteinLiquidApplication:new FormControl(null,{validators:[Validators.required]        
      }),



      growthProductName:new FormControl(null,{validators:[Validators.required]        
      }),
      growthProductDescription:new FormControl(null,{validators:[Validators.required]        
      }),

      growthPowderAdvantageUpdate:new FormControl(null,{validators:[Validators.required]        
      }),
      growthPowderAdvantage:new FormControl(null,{validators:[Validators.required]        
      }),
      growthPowderApllicationUpdate:new FormControl(null,{validators:[Validators.required]        
      }),
      growthPowderApplication:new FormControl(null,{validators:[Validators.required]        
      }),

      growthLiquidAdvantageUpdate:new FormControl(null,{validators:[Validators.required]        
      }),
      growthLiquidAdvantage:new FormControl(null,{validators:[Validators.required]        
      }),
      growthLiquidApllicationUpdate:new FormControl(null,{validators:[Validators.required]        
      }),
      growthLiquidApplication:new FormControl(null,{validators:[Validators.required]        
      }),

    });


    this.productService.getProducts();
    this.productInfoSub = this.productService.getProductUpdateListener().subscribe((productDetails:any)=>{
      console.log("products details protein menu component",productDetails);
      this.productInfoDisplay = productDetails;
    });
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

  //UPDATE PROTEIN FUNCTIONS

  onUpdateProductName(productID:any){
    console.log(this.form.value.productDescription,productID);
    this.productService.updateProduct(productID,this.form.value.productName,this.form.value.productDescription);
  }

  onAddProteinPowderAdvantage(productID:any){
    console.log("jsnjasajsjasajhs",productID);
    this.productService.addProteinPowderAdvantage(productID,this.form.value.proteinPowderAdvantage);
  }

  onAddProteinPowderApplication(productID:any){
    console.log("asasasas",productID);
    this.productService.addProteinPowderApplication(productID,this.form.value.proteinPowderApplication)
  }
  
  onUpdatePPApplication(ppAppIndex:any,productIndex:any,productID:any){
    this.productInfoDisplay.forEach(element => {
      element[productIndex].protein.powder.ppApplication[ppAppIndex] = this.form.value.proteinPowderApllicationUpdate;
      this.ppApplicationUpdated = element[productIndex].protein.powder.ppApplication
    });
    this.productService.updateProteinPowderApplication(productID,this.ppApplicationUpdated);
  }

  onUpdatePPAdvantage(ppAppIndex:any,productIndex:any,productID:any){
    console.log("qwerty",this.form.value.proteinPowderAdvantageUpdate,ppAppIndex);
    console.log(this.productInfoDisplay,"asasas",productIndex);
    this.productInfoDisplay.forEach(element => {
      console.log(element[productIndex]);
      element[productIndex].protein.powder.ppAdvantages[ppAppIndex] = this.form.value.proteinPowderAdvantageUpdate;
      console.log([element],"sdsdsdsd",this.productInfoDisplay)
      this.ppAdvantageUpdated = element[productIndex].protein.powder.ppAdvantages
      console.log("qwerty",this.ppAdvantageUpdated)
    });
    this.productService.updateProteinPowderAdvantage(productID,this.ppAdvantageUpdated);
  }

  onAddProteinLiquidAdvantage(productID:any){
    this.productService.addProteinLiquidAdvantage(productID,this.form.value.proteinLiquidAdvantage);
  }


  onUpdatePLAdvantage(ppAppIndex:any,productIndex:any,productID:any){
    this.productInfoDisplay.forEach(element => {
      element[productIndex].protein.liquid.plAdvantages[ppAppIndex] = this.form.value.proteinLiquidAdvantageUpdate;
      console.log([element],"sdsdsdsd",this.productInfoDisplay)
      this.plAdvantageUpdated = element[productIndex].protein.liquid.plAdvantages
    });
    this.productService.updateProteinLiquidAdvantage(productID,this.plAdvantageUpdated);
  }

  onAddProteinLiquidApplication(productID:any){
    this.productService.addProteinLiquidApplication(productID,this.form.value.proteinLiquidApplication)
  }

  onUpdatePLApplication(ppAppIndex:any,productIndex:any,productID:any){
    this.productInfoDisplay.forEach(element => {
      element[productIndex].protein.liquid.plApplication[ppAppIndex] = this.form.value.proteinLiquidApllicationUpdate;
      this.plApplicationUpdated = element[productIndex].protein.liquid.plApplication
    });
    this.productService.updateProteinLiquidApplication(productID,this.plApplicationUpdated);
  }


//GROWTH FACTOR UPDATE FUNCTIONS

onUpdateGrowthProductName(productID:any){
  console.log(this.form.value.growthProductDescription,productID,this.form.value.growthProductName);
  this.productService.updateGrowthProduct(productID,this.form.value.growthProductName,this.form.value.growthProductDescription);
}

onUpdateGPAdvantage(ppAppIndex:any,productIndex:any,productID:any){
  this.productInfoDisplay.forEach(element => {
    element[productIndex].growthFactor.powder.gpAdvantages[ppAppIndex] = this.form.value.growthPowderAdvantageUpdate;
    this.gpAdvantageUpdated = element[productIndex].growthFactor.powder.gpAdvantages
  });
  this.productService.updateGrowthPowderAdvantage(productID,this.gpAdvantageUpdated);
}

onAddGrowthPowderAdvantage(productID:any){
  console.log("jsnjasajsjasajhs",productID);
  this.productService.addGrowthPowderAdvantage(productID,this.form.value.growthPowderAdvantage);
}

onUpdateGPApplication(ppAppIndex:any,productIndex:any,productID:any){
  this.productInfoDisplay.forEach(element => {
    element[productIndex].growthFactor.powder.gpApplication[ppAppIndex] = this.form.value.growthPowderApllicationUpdate;
    this.gpApplicationUpdated = element[productIndex].growthFactor.powder.gpApplication
  });
  this.productService.updateGrowthPowderApplication(productID,this.gpApplicationUpdated);
}

onAddGrowthPowderApplication(productID:any){
  console.log("asasasas",productID);
  this.productService.addGrowthPowderApplication(productID,this.form.value.growthPowderApplication)
}


onUpdateGLAdvantage(ppAppIndex:any,productIndex:any,productID:any){
    this.productInfoDisplay.forEach(element => {
    element[productIndex].growthFactor.liquid.glAdvantages[ppAppIndex] = this.form.value.growthLiquidAdvantageUpdate;
    this.glAdvantageUpdated = element[productIndex].growthFactor.liquid.glAdvantages
  });
  this.productService.updateGrowthLiquidAdvantage(productID,this.glAdvantageUpdated);
}

onAddGrowthLiquidAdvantage(productID:any){
  this.productService.addGrowthLiquidAdvantage(productID,this.form.value.growthLiquidAdvantage);
}

onUpdateGLApplication(ppAppIndex:any,productIndex:any,productID:any){
  this.productInfoDisplay.forEach(element => {
    element[productIndex].growthFactor.liquid.glApplication[ppAppIndex] = this.form.value.growthLiquidApllicationUpdate;
    this.glApplicationUpdated = element[productIndex].growthFactor.liquid.glApplication
  });
  this.productService.updateGrowthLiquidApplication(productID,this.glApplicationUpdated);
}

onAddGrowthLiquidApplication(productID:any){
  this.productService.addGrowthLiquidApplication(productID,this.form.value.growthLiquidApplication)
}


}
