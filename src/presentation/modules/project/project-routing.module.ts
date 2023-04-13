import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLayoutComponent } from './layouts/project-layout/project-layout.component';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';

const routes: Routes = [
  {
    path: '', // localhost:4200/to-do-list/dashboard
    component: ProjectLayoutComponent,
    children: [
      {
        path: '', // localhost:4200/to-do-list/dashboard
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
export class ProjectRoutingModule {}
