import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  form:FormGroup;
  form2:FormGroup;
  public pApplicationArr:any[]=[];
  public pAdvantagesArr:any[]=[];
  public lApplicationArr:any[]=[];
  public lAdvantagesArr:any[]=[];
  // public limage: any[] = [];

  public gpApplicationArr:any[]=[];
  public gpAdvantagesArr:any[]=[];
  public glApplicationArr:any[]=[];
  public glAdvantagesArr:any[]=[];

  public glfileURL: any;
  public gpfileURL: any;
  public plfileURL: any;
  public ppfileURL: any;
  // public gimage: any[] = [];

  private productSub: Subscription;
  private gproductSub: Subscription;
  public productInfoDisplay: any;
  public growthInfoDisplay: any;
  constructor(public productService: ProductsService, private spinner: NgxSpinnerService) { }

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
      ppimagePath:new FormControl(null,{validators:[Validators.required]        
      }),
      plimagePath:new FormControl(null,{validators:[Validators.required]        
      })
    });

    this.form2 = new FormGroup({
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
      gpimagePath:new FormControl(null,{validators:[Validators.required]        
      }),
      glimagePath:new FormControl(null,{validators:[Validators.required]        
      })
    });

    this.productInfoDisplay = this.productService.getSavedProtiens();
    this.growthInfoDisplay = this.productService.getSavedGrowthFactors();
    if (this.productInfoDisplay.length === 0) {
      this.spinner.show();
      this.productService.getProtien();
      this.productSub = this.productService.getProtineListener().subscribe(
        (protiens: any[]) => {
        this.productInfoDisplay = protiens;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      });
      this.productService.getGrowthFactors();
      this.gproductSub = this.productService.getGFListener().subscribe(
        (gfs: any[]) => {
        this.growthInfoDisplay = gfs;
      });
    }
  }

  fileChange(event) {
    var photo;
    var r = new FileReader();
    var fileSize = Math.floor ((event.target.files[0].size) / (1000000));
    if (fileSize > 2) {
      return;
    }
    r.readAsDataURL(event.target.files[0]);

    r.onload = (e: any) => {
      photo = e.target.result;
      photo = photo + '';
      console.log(photo);
      return photo;
    }; 
  }

  onImagePickedgl(event) {
    var photo;
    var r = new FileReader();
    var fileSize = Math.floor ((event.target.files[0].size) / (1000000));
    if (fileSize > 2) {
      return;
    }
    r.readAsDataURL(event.target.files[0]);

    r.onload = (e: any) => {
      photo = e.target.result;
      photo = photo + '';
      console.log(photo);
      this.glfileURL = photo;
    }; 
    // this.glfileURL = await this.fileChange(event);
  }

  onImagePickedgp(event) {
    var photo;
    var r = new FileReader();
    var fileSize = Math.floor ((event.target.files[0].size) / (1000000));
    if (fileSize > 2) {
      return;
    }
    r.readAsDataURL(event.target.files[0]);

    r.onload = (e: any) => {
      photo = e.target.result;
      photo = photo + '';
      console.log(photo);
      this.gpfileURL = photo;
    }; 
    // this.gpfileURL = this.fileChange(event);
  }

  onImagePickedpl(event) {
    var photo;
    var r = new FileReader();
    var fileSize = Math.floor ((event.target.files[0].size) / (1000000));
    if (fileSize > 2) {
      return;
    }
    r.readAsDataURL(event.target.files[0]);

    r.onload = (e: any) => {
      photo = e.target.result;
      photo = photo + '';
      console.log(photo);
      this.plfileURL = photo;
    }; 
    // this.plfileURL = this.fileChange(event);
  }

  onImagePickedpp(event) {
    var photo;
    var r = new FileReader();
    var fileSize = Math.floor ((event.target.files[0].size) / (1000000));
    if (fileSize > 2) {
      return;
    }
    r.readAsDataURL(event.target.files[0]);

    r.onload = (e: any) => {
      photo = e.target.result;
      photo = photo + '';
      console.log(photo);
      this.ppfileURL = photo;
    }; 
    // this.ppfileURL = this.fileChange(event);
  }

  onUpdateProductName(productID:any){
    console.log(this.form.value.productDescription,productID);
    this.productService.updateProduct(productID,this.form.value.productName,this.form.value.productDescription);
  }

  onAddGrowthFactors(){

    if(this.form2.value.gpapplication)
    {
      this.gpApplicationArr = this.form2.value.gpapplication.split(';');
    }
    if(this.form2.value.gpadvantages)
    {
      this.gpAdvantagesArr = this.form2.value.gpadvantages.split(';');
    }

    if(this.form2.value.glapplication)
    {
      this.glApplicationArr = this.form2.value.glapplication.split(';');
    }
    if(this.form2.value.gladvantages)
    {
      this.glAdvantagesArr = this.form2.value.gladvantages.split(';');
    }

    console.log(this.form2);
    // console.log('growthFactorProduct :  ' , growthFactorProduct);
    const imageData = new FormData();
    // imageData.append("file", );
    // this.productService.uploadImageAndgetURL(imageData).subscribe((data) => {
    //     let lfileURL  = data.fileUrl;
    //     const imageData2 = new FormData();
    //     imageData2.append("file", this.gpfileURL);
    //     this.productService.uploadImageAndgetURL(imageData2).subscribe((pdata) => {
    //       let pfileURL = pdata.fileUrl;
    //   });
    // });
    // var limg = new Blob(this.glfileURL, 'png');
    const growthFactorProduct = {
      growthFactorName : this.form2.value.growthName,
      growthFactorDescription: this.form2.value.growthDescription,
      powder: {
          gpApplication: this.gpApplicationArr,
          gpAdvantages: this.gpAdvantagesArr,
          gpimagePath: this.gpfileURL
      },
        liquid: {
          glAdvantages: this.glAdvantagesArr,
          glApplication: this.glApplicationArr,
          glimagePath: this.glfileURL
      }
    };
    // var abc = new Blob(this.glfileURL.convertToBase64((base) => {
    //   console.log('base' , base);
    // }));
    console.log('growthFactorProduct :  ' , growthFactorProduct);
    this.productService.addGrowthFactor(growthFactorProduct);
  }

  deleteProtien(id: any) {
    this.productService.deleteProtien(id);
  }

  deleteGF(id: any) {
    this.productService.deleteGF(id);
  }

  onAddProduct() {
    console.log('application data', this.form.value.padvantages);
    if (this.form.value.papplication) {
      this.pApplicationArr = this.form.value.papplication.split(';');
    }
    if (this.form.value.padvantages) {
      this.pAdvantagesArr = this.form.value.padvantages.split(';');
    }

    if (this.form.value.lapplication) {
      this.lApplicationArr = this.form.value.lapplication.split(';');
    }
    if (this.form.value.ladvantages) {
      this.lAdvantagesArr = this.form.value.ladvantages.split(';');
    }


    console.log(this.form);

    const protienProduct = {
      proteinName : this.form.value.proteinName,
      proteinDescription: this.form.value.proteinDescription,
      powder: {
          ppAdvantages: this.pAdvantagesArr,
          ppApplication: this.pApplicationArr ,
          ppimagePath: this.ppfileURL
      },
        liquid: {
          plAdvantages: this.lAdvantagesArr,
          plApplication: this.lApplicationArr ,
          plimagePath: this.plfileURL
      }
    };

    // console.log("application data",productObj);
    this.productService.addProtiens(protienProduct);
  }
}
