import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTasksComponent } from './list-tasks.component';
import { GetAllTasksUseCase } from 'src/bussiness/useCases/task/getAllTasks.usercase';
import { NgModule } from '@angular/core';
import { UserModule } from 'src/data/repositories/user/user.module';
import { GetTasksByUserIdUseCase } from 'src/bussiness/useCases/task/getTasksByUserId.usercase';
import { GetUsersUseCase } from 'src/bussiness/useCases/user/getUsers.usecase';
import { AssignTaskUseCase } from 'src/bussiness/useCases/task/assignTask.usercase';
import { CompleteTaskUseCase } from 'src/bussiness/useCases/task/completeTask.usercase';
import { DeleteTaskUseCase } from 'src/bussiness/useCases/task/deleteTask.usercase';
import { ToastrService } from 'ngx-toastr';

describe('ListTasksComponent', () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTasksComponent],
      imports: [
        UserModule
      ],
      providers: [{
        provide: GetAllTasksUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: GetTasksByUserIdUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: GetUsersUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: AssignTaskUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: CompleteTaskUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: DeleteTaskUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: ToastrService, useValue: {
          success: () => { }
        }
      }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
