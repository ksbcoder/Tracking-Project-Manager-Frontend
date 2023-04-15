import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { FormProjectComponent } from './components/form-project/form-project.component';
import { UpdateProjectComponent } from './pages/update-project/update-project.component';
import { GetProjectComponent } from './pages/get-project/get-project.component';

@NgModule({
  declarations: [ListProjectsComponent, CreateProjectComponent, FormProjectComponent, UpdateProjectComponent, GetProjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
})
export class ProjectModule {}
