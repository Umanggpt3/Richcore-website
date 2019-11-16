import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productID:any;
  private product:any;
  private products:any[]=[];
  private productsUpdated = new Subject<any[]>();
  private productdetailsUpdated = new Subject<any>();


  constructor(private http:HttpClient,private router:Router) { }

  addProducts(productData:any)
  {
   console.log("in service",productData);
   this.http.post<{message:string;productID:string}>("http://localhost:1025/products/info",productData).subscribe(responseData => {
     console.log("responseData",responseData);
     if(responseData["message"]=="success")
        alert("Product Added Successfully");
    //   location.id = responseData.locationId;
    //   this.locations=[];
    //   this.locations.push(location);
    //   this.locationUpdated.next([...this.locations]);
   });
  }




  getProducts(){
    this.http.get<{message:string,data:any}>("http://localhost:1025/products/info"
    ).pipe(map((productData)=>{
      return productData.data.map(
        product=>{
          return {
            protein:product.protein,
            growthFactor:product.growthFactor,
            _id:product._id
          };
        });
    }))
    .subscribe(responseData => {
        var productData = responseData;
        console.log("product dat in service",productData);
        this.products = [];
        this.products.push(productData);
        this.productsUpdated.next([...this.products]);
        console.log(responseData);
    })
  }

  getProductID(productID:any){
    this.productID = productID;
    console.log("id in service",productID)
    this.getProduct(productID);
  }

  getProduct(productID){
    return this.http.get<{message:string,product:any}>("http://localhost:1025/products/info/" + productID).subscribe(productDetails => {
      this.product = productDetails.product 
      this.productdetailsUpdated.next(this.product);
      console.log("product data in service ",productDetails);
      })
    
  }


//UPDATE PROTEIN FUNCTIONS

  updateProduct(productID:any,proteinName:any,proteinDescription:any){
    console.log("in updateProduct",productID,proteinName,proteinDescription);
    var proteinData = {proteinName:proteinName,proteinDescription:proteinDescription}

    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
        if(responseData["status"]=="success")
        {
          console.log("response data afetr update",responseData);
          // var productData = responseData["data"];
          // const updatedLocation = [...this.locations];
          // console.log("updated location data",locationData);
          // const oldLocationIndex = updatedLocation.findIndex(p => p.id === id);
          // updatedLocation[oldLocationIndex]= locationData;
          // this.locations = updatedLocation;
          // this.locationUpdated.next([...this.locations]);
          // alert("Location Updated Successfully");
        }
    })

  }


  addProteinPowderAdvantage(productID:any,proteinPowderAdvantage:any){
    console.log("in updateProduct",productID,proteinPowderAdvantage);
    var proteinData = {proteinPowderAdvantage:proteinPowderAdvantage}

    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
    })
  }

  addProteinPowderApplication(productID:any,proteinPowderApplication:any){
    console.log("in updateProduct service",productID,proteinPowderApplication);
    var proteinData = {proteinPowderApplication:proteinPowderApplication}

    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{

    })
  }
  updateProteinPowderApplication(productID:any,ppAppArr:any){
    console.log("in updateProduct",ppAppArr);
    var proteinData = {proteinPowderApplicationArr:ppAppArr}

    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
    })
  }

  updateProteinPowderAdvantage(productID:any,ppAdvArr:any){
    var proteinData = {proteinPowderAdvantageArr:ppAdvArr}
    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
    })
  }

  updateProteinLiquidAdvantage(productID:any,plAdvArr:any){
    var proteinData = {proteinLiquidAdvantageArr:plAdvArr}
    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
    })
  }

  addProteinLiquidAdvantage(productID:any,proteinLiquidAdvantage:any){
    var proteinData = {proteinLiquidAdvantage:proteinLiquidAdvantage}
    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
    })
  }

  updateProteinLiquidApplication(productID:any,plAppArr:any){
    var proteinData = {proteinLiquidApplicationArr:plAppArr}

    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
    })
  }

  addProteinLiquidApplication(productID:any,proteinLiquidApplication:any){
    var proteinData = {proteinLiquidApplication:proteinLiquidApplication}
    this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
    })
  }


//UPDATE GROWTH FACTOR FUNCTIONS

updateGrowthProduct(productID:any,growthName:any,growthDescription:any){
  console.log("in updateProduct",productID,growthName,growthDescription);
  var proteinData = {growthName:growthName,growthDescription:growthDescription}

  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })

}


updateGrowthPowderAdvantage(productID:any,gpAdvArr:any){
  var proteinData = {growthPowderAdvantageArr:gpAdvArr}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

addGrowthPowderAdvantage(productID:any,growthPowderAdvantage:any){
  var proteinData = {growthPowderAdvantage:growthPowderAdvantage}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

updateGrowthPowderApplication(productID:any,gpAppArr:any){
  var proteinData = {growthPowderApplicationArr:gpAppArr}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

addGrowthPowderApplication(productID:any,growthPowderApplication:any){
  var proteinData = {growthPowderApplication:growthPowderApplication}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

updateGrowthLiquidAdvantage(productID:any,glAdvArr:any){
  var proteinData = {growthLiquidAdvantageArr:glAdvArr}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

addGrowthLiquidAdvantage(productID:any,growthLiquidAdvantage:any){
  var proteinData = {growthLiquidAdvantage:growthLiquidAdvantage}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

updateGrowthLiquidApplication(productID:any,glAppArr:any){
  var proteinData = {growthLiquidApplicationArr:glAppArr}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

addGrowthLiquidApplication(productID:any,growthLiquidApplication:any){
  var proteinData = {growthLiquidApplication:growthLiquidApplication}
  this.http.put<{data:any}>("http://localhost:1025/products/info/"+ productID,proteinData).subscribe(responseData =>{
  })
}

getproductdetailsUpdateListener(){
  return this.productdetailsUpdated.asObservable();
}

getProductUpdateListener(){
  return this.productsUpdated.asObservable();
}

}
