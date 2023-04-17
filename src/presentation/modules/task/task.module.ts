import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { GetTaskComponent } from './pages/get-task/get-task.component';

@NgModule({
  declarations: [
    FormTaskComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ListTasksComponent,
    GetTaskComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class TaskModule {}
