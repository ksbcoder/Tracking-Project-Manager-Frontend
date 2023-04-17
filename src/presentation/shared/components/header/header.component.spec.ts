import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/presentation/core/security/services/userAuth/auth.service';
import { ShowForRolesDirective } from '../../directives/show-for-roles.directive';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [{
        ShowForRolesDirective, useValue: {
          execute: () => { }
        }
      }],
      providers: [{
        provide: AuthService, useValue: {
          SignOut: () => { }
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
