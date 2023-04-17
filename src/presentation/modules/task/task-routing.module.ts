import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { Roles } from 'src/base/utils/enums';
import { allowedRoles } from 'src/presentation/shared/guards/has-role.guard';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { GetTaskComponent } from './pages/get-task/get-task.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: AppLayoutComponent,
    children: [
      {
        path: 'list',
        component: ListTasksComponent,
      },
      {
        path: 'create',
        canActivate: [allowedRoles([Roles.Admin])],
        canLoad: [allowedRoles([Roles.Admin])],
        component: CreateTaskComponent,
      },
      {
        path: 'update/:id',
        canActivate: [allowedRoles([Roles.Admin])],
        canLoad: [allowedRoles([Roles.Admin])],
        component: UpdateTaskComponent,
      },
      {
        path: 'detail/:id',
        component: GetTaskComponent,
      },
      {
        path: '**',
        component: ListTasksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
