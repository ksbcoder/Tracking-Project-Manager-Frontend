import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
import {
  HasRoleGuard,
  allowedRoles,
} from 'src/presentation/shared/guards/has-role.guard';

import { Roles } from 'src/base/utils/enums';

const routes: Routes = [
  {
    path: 'users',
    canActivate: [allowedRoles([Roles.Admin])],
    canLoad: [allowedRoles([Roles.Admin])],
    component: AppLayoutComponent,
    children: [
      {
        path: 'list',
        component: ListUsersComponent,
      },
      {
        path: 'update/:id',
        component: UpdateUserComponent,
      },
      {
        path: '**',
        component: ListUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [HasRoleGuard],
  exports: [RouterModule],
})
export class UserRoutingModule {}
