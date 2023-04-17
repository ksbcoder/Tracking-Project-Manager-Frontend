import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProjectComponent } from './get-project.component';
import { ProjectModule } from 'src/data/repositories/project/project.module';
import { GetProjectByIdUseCase } from 'src/bussiness/useCases/project/getProjectById.usecase';
import { UserModule } from 'src/presentation/modules/user/user.module';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('GetProjectComponent', () => {
  let component: GetProjectComponent;
  let fixture: ComponentFixture<GetProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetProjectComponent],
      imports: [ProjectModule, UserModule],
      providers: [{
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

    fixture = TestBed.createComponent(GetProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
