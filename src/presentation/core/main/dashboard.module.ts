import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserRoutingModule } from 'src/presentation/modules/user/user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { ProjectRoutingModule } from 'src/presentation/modules/project/project-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    UserRoutingModule,
    ProjectRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
})
export class DashboardModule {}
