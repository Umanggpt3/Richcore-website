import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about-us/about/about.component';
import { BannerComponent } from './banner/banner.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { ContactFormComponent } from './contact-us/contact-form/contact-form.component';
import { AdminLocationComponent } from './Admin/admin-location/admin-location.component';

const routes: Routes = [
  {
    path:'',component:BannerComponent
  },

  {
      path: 'about',
      component: AboutComponent
  },
  {
    path:'contact',component:ContactFormComponent
  },
  {
    path:'admin',component:AdminComponent
  },
  {
    path:'admin-location',component:AdminLocationComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
