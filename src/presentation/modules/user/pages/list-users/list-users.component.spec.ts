/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersComponent } from './list-users.component';
import { GetUsersUseCase } from 'src/bussiness/useCases/user/getUsers.usecase';
import { ToastrService } from 'ngx-toastr';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsersComponent],
      providers: [
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
          provide: ToastrService, useValue: {
            success: () => { }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
