import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskComponent } from './create-task.component';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { TaskModule } from '../../task.module';
import { FormTaskComponent } from '../../components/form-task/form-task.component';
import { GetProjectsByLeaderIdUseCase } from 'src/bussiness/useCases/project/getProjectsByLeaderId.usecase';
import { GetUsersUseCase } from 'src/bussiness/useCases/user/getUsers.usecase';
import { CreateTaskUseCase } from 'src/bussiness/useCases/task/createTask.usercase';
import { GetTaskByIdUseCase } from 'src/bussiness/useCases/task/getTaskById.usercase';
import { UpdateTaskUseCase } from 'src/bussiness/useCases/task/updateTask.usercase';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      imports: [SharedModule, TaskModule],
      providers: [
        {
          provide: GetProjectsByLeaderIdUseCase, useValue: {
            execute: () => {
              return {
                subscribe: () => { }
              }
            }
          }
        },
        {
          provide: GetUsersUseCase, useValue: {
            execute: () => {
              return {
                subscribe: () => { }
              }
            }
          }
        },
        {
          provide: GetTaskByIdUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: CreateTaskUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: UpdateTaskUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            params: {
              subscribe: () => { }
            }
          }
        },
        {
          provide: Router, useValue: {
            navigate: () => {
              return {
                subscribe: () => { }
              }
            }
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

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
