import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { HeaderComponent } from 'src/presentation/shared/components/header/header.component';
import { GetAllProjectsUseCase } from 'src/bussiness/useCases/project/getAllProjects.usecase';
import { ProjectModule } from 'src/data/repositories/project/project.module';
import { ToastrService } from 'ngx-toastr';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [ProjectModule, SharedModule],
      providers: [
        {
          provide: GetAllProjectsUseCase, useValue: {
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

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
