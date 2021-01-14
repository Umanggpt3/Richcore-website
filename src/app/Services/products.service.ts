import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { RootServiceService } from './root-service.service';

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
  private url: any;


  constructor(private http: HttpClient, private router: Router, private rootService: RootServiceService) {
    this.url = rootService.getUrlwithPort();
  }
// 
  addProducts(productData:any)
  {
   this.http.post<{message:string;productID:string}>(this.url + "/products/info",productData).subscribe(responseData => {
     if(responseData["message"]=="success")
        alert("{Product} Added Successfully");
   });
  }

  addProtiens(protienData: any) {
   this.http.post<{message: string; productID: string}>(this.url + '/products/addProtien', protienData)
   .subscribe(responseData => {
     if (responseData['message'] === 'success') {
        alert('Protein Added Successfully');
     } else {
        alert('Failed to Add Protein');
     }
   });
  }

  addGrowthFactor(gfData: any) {
   this.http.post<{message: string; productID: string}>(this.url + '/products/addGrowthFactor', gfData)
   .subscribe(responseData => {
     if (responseData["message"] === 'success') {
        alert('Growth Factor Added Successfully');
     } else {
      alert('Failed to Add Growth Factor');
     }
   });
  }


  getProtien() {
    this.http.get<{message: string, data: any}>(this.url + '/products/protienInfo'
    ).subscribe((protData) => {
      this.protiens = protData.data;
      this.protienUpdated.next([...this.protiens]);
    });
  }

  deleteProtien(id: any) {
    var abc = {
      id: id
    };
    this.http.post<{status: string; data: any}>(this.url + '/products/deleteProtien', abc).subscribe(res => {
      console.log(res);
      if (res['status'] === 'success') {
        alert('Deleted');
      } else {
        alert('Failed');
      }
    });
  }

  deleteGF(id: any) {
    var abc = {
      id: id
    };
    this.http.post<{status: string; data: any}>(this.url + '/products/deleteGrowthFactor', abc).subscribe(res => {
      console.log(res);
      if (res['status'] === 'success') {
        alert('Deleted');
      } else {
        alert('Failed');
      }
    });
  }

  getProtienByID(ID: any): Observable<any> {
    var reqPayload = {id : ID};
    return this.http.post<{message: string, data: any}>(this.url + '/products/protienInfoById' , reqPayload);
  }

  getGrowthFactorByID(ID: any): Observable<any> {
    var reqPayload = {id : ID};
    return this.http.post<{message: string, data: any}>(this.url + '/products/growthFactorInfoById' , reqPayload);
  }

  getGrowthFactors() {
    this.http.get<{message: string, data: any}>
    (this.url + '/products/growthFactorInfo').subscribe((gfData) => {
      this.growthFactors = gfData.data;
      this.gfUpdated.next([...this.growthFactors]);
    });
  }

  getProducts(){
    this.http.get<{message:string,data:any}>(this.url + "/products/info"
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
      (this.url + '/products/info/' + productID).subscribe(productDetails => {
      this.product = productDetails.product;
      this.productdetailsUpdated.next(this.product);
      });
  }

  getGFListener() {
    return this.gfUpdated.asObservable();
  }


  updateProduct(productID:any,proteinName:any,proteinDescription:any){
    var proteinData = {proteinName:proteinName,proteinDescription:proteinDescription}

    this.http.put<{data:any}>(this.url + "/products/info/"+ productID,proteinData).subscribe(responseData =>{
        if(responseData["status"]=="success")
        {
        }
    })

  }

  uploadImageAndgetURL(file: any): Observable<any> {
    return this.http.post<{fileUrl: string}>(this.url + '/products/upload', file);
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
