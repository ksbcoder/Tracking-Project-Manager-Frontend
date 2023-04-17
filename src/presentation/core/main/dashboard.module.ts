import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserRoutingModule } from 'src/presentation/modules/user/user-routing.module';
import { ProjectRoutingModule } from 'src/presentation/modules/project/project-routing.module';
import { InscriptionRoutingModule } from 'src/presentation/modules/inscription/inscription-routing.module';
import { TaskRoutingModule } from 'src/presentation/modules/task/task-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    UserRoutingModule,
    ProjectRoutingModule,
    InscriptionRoutingModule,
    TaskRoutingModule,
  ],
})
export class DashboardModule {}
