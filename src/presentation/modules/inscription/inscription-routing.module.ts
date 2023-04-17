import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
import { ListInscriptionsComponent } from './pages/list-inscriptions/list-inscriptions.component';
import { Roles } from 'src/base/utils/enums';
import { allowedRoles } from 'src/presentation/shared/guards/has-role.guard';

const routes: Routes = [
  {
    path: 'inscriptions',
    canActivate: [allowedRoles([Roles.Admin])],
    canLoad: [allowedRoles([Roles.Admin])],
    component: AppLayoutComponent,
    children: [
      {
        path: 'list',
        component: ListInscriptionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionRoutingModule {}
