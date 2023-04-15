import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
import { ListInscriptionsComponent } from './pages/list-inscriptions/list-inscriptions.component';

const routes: Routes = [
  {
    path: 'inscriptions',
    component: AppLayoutComponent,
    children: [
      {
        path: 'list',
        component: ListInscriptionsComponent,
      },
      // {
      //   path: 'create',
      //   canActivate: [allowedRoles([Roles.Admin])],
      //   canLoad: [allowedRoles([Roles.Admin])],
      //   component: CreateProjectComponent,
      // },
      // {
      //   path: 'update/:id',
      //   canActivate: [allowedRoles([Roles.Admin])],
      //   canLoad: [allowedRoles([Roles.Admin])],
      //   component: UpdateProjectComponent,
      // },
      // {
      //   path: 'detail/:id',
      //   component: GetProjectComponent,
      // },
      // {
      //   path: '**',
      //   component: ListProjectsComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionRoutingModule {}
