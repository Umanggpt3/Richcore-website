import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productID:any;
  private product:any;
  
  public protiens: any[]=[];
  public growthFactors: any[]=[];
  private protienUpdated = new Subject<any[]>();
  private gfUpdated = new Subject<any[]>();
  
  private products:any[]=[];
  private productsUpdated = new Subject<any[]>();
  private productdetailsUpdated = new Subject<any>();


  constructor(private http:HttpClient,private router:Router) { }
// 
  addProducts(productData:any)
  {
   this.http.post<{message:string;productID:string}>("http://18.223.232.75:1035/products/info",productData).subscribe(responseData => {
     if(responseData["message"]=="success")
        alert("{Product} Added Successfully");

   });
  }

  addProtiens(protienData:any)
  {
   this.http.post<{message:string;productID:string}>("http://18.223.232.75:1035/products/addProtien",protienData).subscribe(responseData => {
     if(responseData["message"]==='success'){
        alert(responseData);
     }else{
      alert("errr");

     }
   });
  }

  addGrowthFactor(gfData:any)
  {
   this.http.post<{message:string;productID:string}>("http://18.223.232.75:1035/products/addGrowthFactor",gfData).subscribe(responseData => {
     if(responseData["message"]==='success'){
        
     }else{

     }
   });
  }


  getProtien(){
    this.http.get<{message:string,data:any}>("http://18.223.232.75:1035/products/protienInfo"
    ).subscribe((protData) => {
      this.protiens = protData.data;
      this.protienUpdated.next([...this.protiens]);
    });
  }

  getProtienByID(ID: any): Observable<any> {
    var reqPayload = {id : ID};
    return this.http.post<{message: string, data: any}>('http://18.223.232.75:1035/products/protienInfoById' , reqPayload);
  }

  getGrowthFactorByID(ID: any): Observable<any> {
    var reqPayload = {id : ID};
    return this.http.post<{message: string, data: any}>('http://18.223.232.75:1035/products/growthFactorInfoById' , reqPayload);
  }

  getGrowthFactors() {
    this.http.get<{message: string, data: any}>
    ('http://18.223.232.75:1035/products/growthFactorInfo').subscribe((gfData) => {
      this.growthFactors = gfData.data;
      this.gfUpdated.next([...this.growthFactors]);
    });
  }

  getProducts(){
    this.http.get<{message:string,data:any}>("http://18.223.232.75:1035/products/info"
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
        this.products = [];
        this.products.push(productData);
        this.productsUpdated.next([...this.products]);
    })
  }

  getProductID(productID:any) {
    this.productID = productID;
    this.getProduct(productID);
  }

  getProtineListener() {
    return this.protienUpdated.asObservable();
  }

  getProduct(productID) {
    return this.http.get<{message: string, product: any}>
      ('http://18.223.232.75:1035/products/info/' + productID).subscribe(productDetails => {
      this.product = productDetails.product;
      this.productdetailsUpdated.next(this.product);
      });
  }

  getGFListener() {
    return this.gfUpdated.asObservable();
  }


  updateProduct(productID:any,proteinName:any,proteinDescription:any){
    var proteinData = {proteinName:proteinName,proteinDescription:proteinDescription}

    this.http.put<{data:any}>("http://18.223.232.75:1035/products/info/"+ productID,proteinData).subscribe(responseData =>{
        if(responseData["status"]=="success")
        {
        }
    })

  }

  uploadImageAndgetURL(file: any): Observable<any> {
    return this.http.post<{fileUrl: string}>('http://18.223.232.75:1035/products/upload', file);
  }

  getSavedProtiens() {
    return [...this.protiens];
  }

  getSavedGrowthFactors() {
    return [...this.growthFactors];
  }




getproductdetailsUpdateListener() {
  return this.productdetailsUpdated.asObservable();
}



getProductUpdateListener() {
  return this.productsUpdated.asObservable();
}

}
