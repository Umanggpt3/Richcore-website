import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about-us/about/about.component';
import { BannerComponent } from './banner/banner.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { ContactFormComponent } from './contact-us/contact-form/contact-form.component';
import { AdminLocationComponent } from './Admin/admin-location/admin-location.component';
import { ProteinComponent } from './Products/Product-Protein/protein/protein.component';
import { ProteinInfoComponent } from './Products/Product-Protein/protein-info/protein-info.component';
import { AdminProductsComponent } from './Admin/admin-products/admin-products/admin-products.component';
import { GrothFacotorDisplayComponent } from './groth-facotor-display/groth-facotor-display.component';

const routes: Routes = [
  {
    path: '', component: BannerComponent
  },
  {
      path: 'about', component: AboutComponent
  },
  {
    path: 'growthFactors-info/:productID/:index', component: GrothFacotorDisplayComponent
  },
  {
    path: 'contact', component: ContactFormComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'admin-location', component: AdminLocationComponent
  },
  {
    path: 'products', component: ProteinComponent
  },
  {
    path: 'products-info/:productID/:index', component: ProteinInfoComponent
  },
  {
    path: 'admin-product', component: AdminProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
