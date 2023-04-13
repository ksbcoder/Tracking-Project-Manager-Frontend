import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
import { DashboardComponent } from 'src/presentation/core/main/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'projects',
    component: AppLayoutComponent,
    children: [
      {
        path: 'list',
        component: ListProjectsComponent,
      },
      // {
      //   path: 'detail/:id', // localhost:4200/to-do-list/dashboard/detalle/x
      //   component: DetalleToDoListComponent,
      // },
      // {
      //   path: 'add', // localhost:4200/to-do-list/dashboard/agregar
      //   component: AgregarToDoListComponent,
      // },
      // {
      //   path: 'edit/:id', // localhost:4200/to-do-list/dashboard/editar
      //   component: EditarToDoListComponent,
      // },
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
