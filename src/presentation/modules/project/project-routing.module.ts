import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { UpdateProjectComponent } from './pages/update-project/update-project.component';
import { allowedRoles } from 'src/presentation/shared/guards/has-role.guard';
import { Roles } from 'src/base/utils/enums';
import { GetProjectComponent } from './pages/get-project/get-project.component';

const routes: Routes = [
  {
    path: 'projects',
    component: AppLayoutComponent,
    children: [
      {
        path: 'list',
        component: ListProjectsComponent,
      },
      {
        path: 'create',
        canActivate: [allowedRoles([Roles.Admin])],
        canLoad: [allowedRoles([Roles.Admin])],
        component: CreateProjectComponent,
      },
      {
        path: 'update/:id',
        canActivate: [allowedRoles([Roles.Admin])],
        canLoad: [allowedRoles([Roles.Admin])],
        component: UpdateProjectComponent,
      },
      {
        path: 'detail/:id',
        component: GetProjectComponent,
      },
      {
        path: '**',
        component: ListProjectsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
