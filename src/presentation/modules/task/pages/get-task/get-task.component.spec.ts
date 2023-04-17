import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTaskComponent } from './get-task.component';
import { GetTaskByIdUseCase } from 'src/bussiness/useCases/task/getTaskById.usercase';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { GetProjectByIdUseCase } from 'src/bussiness/useCases/project/getProjectById.usecase';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('GetTaskComponent', () => {
  let component: GetTaskComponent;
  let fixture: ComponentFixture<GetTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetTaskComponent],
      providers: [{
        provide: GetTaskByIdUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: GetProjectByIdUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: GetUserByIdUseCase, useValue: {
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
        provide: ToastrService, useValue: {
          success: () => { }
        }
      }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
