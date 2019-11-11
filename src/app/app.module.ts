import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { AboutComponent } from './about-us/about/about.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { ContactFormComponent } from './contact-us/contact-form/contact-form.component';
import { AdminLocationComponent } from './Admin/admin-location/admin-location.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { ProteinComponent } from './Products/Product-Protein/protein/protein.component';
import { GrowthfactorComponent } from './Products/Product-Growthfactor/growthfactor/growthfactor.component';
import { ProteinMenuComponent } from './Products/Product-Protein/protein-menu/protein-menu.component';
import { ProteinInfoComponent } from './Products/Product-Protein/protein-info/protein-info.component';
import { AdminProductsComponent } from './Admin/admin-products/admin-products/admin-products.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    WhyUsComponent,
    AboutComponent,
    AdminComponent,
    ContactFormComponent,
    AdminLocationComponent,
    AdminDashboardComponent,
    ProteinComponent,
    GrowthfactorComponent,
    ProteinMenuComponent,
    ProteinInfoComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
