import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjectComponent } from './form-project.component';
import { ProjectModule } from 'src/data/repositories/project/project.module';
import { ProjectModule as projectModuleApp } from 'src/presentation/modules/project/project.module';
import { GetProjectByIdUseCase } from 'src/bussiness/useCases/project/getProjectById.usecase';
import { CreateProjectUseCase } from 'src/bussiness/useCases/project/createProject.usecase';
import { UpdateProjectUseCase } from 'src/bussiness/useCases/project/updateProject.usecase';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('FormProjectComponent', () => {
  let component: FormProjectComponent;
  let fixture: ComponentFixture<FormProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormProjectComponent],
      imports: [ProjectModule, ProjectModule, projectModuleApp],
      providers: [
        {
          provide: GetProjectByIdUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: CreateProjectUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: UpdateProjectUseCase, useValue: {
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
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component when render is true', async () => {
    // Arrange
    component.render = true;
    const compiled = fixture.nativeElement;
    // Act
    fixture.detectChanges();
    await fixture.whenStable();
    // Assert
    expect(compiled.querySelector('form')).toBeTruthy();
  });

  it('should not render component when render is false', async () => {
    // Arrange
    component.render = false;
    const compiled = fixture.nativeElement;
    // Act
    fixture.detectChanges();
    await fixture.whenStable();
    // Assert
    expect(compiled.querySelector('form')).toBeFalsy();
  });

  it('should return false when name is empty', async () => {
    // Arrange
    component.frmProject.controls['name'].setValue('');
    component.frmProject.controls['description'].setValue('Testeando');
    component.frmProject.controls['deadLine'].setValue('2023-04-17');
    component.frmProject.controls['stateProject'].setValue('0');
    // Act and Assert
    expect(component.frmProject.valid).toBeFalsy();
  });

  it('should return false when description is less than 10 characters', async () => {
    // Arrange
    component.frmProject.controls['name'].setValue('Test');
    component.frmProject.controls['description'].setValue('Testeando');
    component.frmProject.controls['deadLine'].setValue('2023-04-17');
    component.frmProject.controls['stateProject'].setValue('0');
    // Act and Assert
    expect(component.frmProject.valid).toBeFalsy();
  })
});
