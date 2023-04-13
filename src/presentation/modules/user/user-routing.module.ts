import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLayoutComponent } from '../project/layouts/project-layout/project-layout.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

const routes: Routes = [
  {
    path: '', // localhost:4200/to-do-list/dashboard
    component: ProjectLayoutComponent,
    children: [
      {
        path: 'list-users', // localhost:4200/to-do-list/dashboard
        component: ListUsersComponent,
      },
      {
        path: 'update-user/:id', // localhost:4200/to-do-list/dashboard/detalle/x
        component: UpdateUserComponent,
      },
      // {
      //   path: 'add', // localhost:4200/to-do-list/dashboard/agregar
      //   component: AgregarToDoListComponent,
      // },
      // {
      //   path: 'edit/:id', // localhost:4200/to-do-list/dashboard/editar
      //   component: EditarToDoListComponent,
      // },
      // {
      //   path: 'list', // localhost:4200/to-do-list/dashboard/listar
      //   component: ListadoToDoListComponent,
      // },
      // {
      //   path: '**', // localhost:4200/to-do-list/dashboard
      //   component: DashboardComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
