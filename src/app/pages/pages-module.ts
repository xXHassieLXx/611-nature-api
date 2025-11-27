import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component/home.component';
import { PlacesComponent } from './places.component/places.component';
import { TrailsComponent } from './trails.component/trails.component';
import { AdminLayout } from './admin-layout/admin-layout';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from './pages.routes';

import { HomeService } from '../core/services/home.service'; 
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TrailService } from '../core/services/trail.service';



@NgModule({
  declarations: [
    HomeComponent,
    PlacesComponent,
    TrailsComponent,
    AdminLayout
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES),
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    NzModalModule
  ],
  providers: [
    HomeService,
    TrailService
  ],
  exports:[
    HomeComponent,
    PlacesComponent,
    TrailsComponent,
    AdminLayout,
    RouterModule
  ]
})
export class PagesModule { }