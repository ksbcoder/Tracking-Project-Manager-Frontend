import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';
import { HeaderComponent } from 'src/presentation/shared/components/header/header.component';
import { FooterComponent } from 'src/presentation/shared/components/footer/footer.component';
import { BackButtonComponent } from 'src/presentation/shared/components/back-button/back-button.component';
import { ProjectLayoutComponent } from './layouts/project-layout/project-layout.component';
import { ProjectRoutingModule } from './project-routing.module';
import { UserRoutingModule } from '../user/user-routing.module';
import { SharedModule } from 'src/presentation/shared/shared.module';

@NgModule({
  declarations: [ProjectLayoutComponent, ListProjectsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
})
export class ProjectModule {}
