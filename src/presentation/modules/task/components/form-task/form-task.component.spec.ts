import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaskComponent } from './form-task.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetProjectsByLeaderIdUseCase } from 'src/bussiness/useCases/project/getProjectsByLeaderId.usecase';
import { GetUsersUseCase } from 'src/bussiness/useCases/user/getUsers.usecase';
import { GetTaskByIdUseCase } from 'src/bussiness/useCases/task/getTaskById.usercase';
import { CreateTaskUseCase } from 'src/bussiness/useCases/task/createTask.usercase';
import { UpdateTaskUseCase } from 'src/bussiness/useCases/task/updateTask.usercase';

describe('FormTaskComponent', () => {
  let component: FormTaskComponent;
  let fixture: ComponentFixture<FormTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTaskComponent],
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

    fixture = TestBed.createComponent(FormTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
