/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/userAuth/auth.service';
import { AppModule } from 'src/presentation/core/main/pages/app/app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AppModule],
      providers: [{
        provide: AuthService, useValue: {
          GoogleAuth: () => { },
          SignIn: () => { },
          SignUp: () => { }
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth when button is clicked', () => {
    const authSpy = spyOn(component, 'auth');
    const button = fixture.debugElement.query(By.css('#signUpWithGoogle')).nativeElement;
    button.click();
    expect(authSpy).toHaveBeenCalled();
  });

  it('should call signUp when button is clicked', () => {
    const signInSpy = spyOn(component, 'signUp');
    const button = fixture.debugElement.query(By.css('#signUpWithEmail')).nativeElement;
    button.click();
    expect(signInSpy).toHaveBeenCalled();
  });
});
