import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about-us/about/about.component';
import { BannerComponent } from './banner/banner.component';

const routes: Routes = [
  {
    path:'',component:BannerComponent
  },

  {
      path: 'about',
      component: AboutComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
