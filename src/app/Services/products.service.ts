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
        alert("Location Added Successfully");
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





getproductdetailsUpdateListener(){
  return this.productdetailsUpdated.asObservable();
}



getProductUpdateListener(){
  return this.productsUpdated.asObservable();
}

}
