import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserModule } from 'src/data/repositories/user/user.module';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserModule],
      providers: [{
        provide: GetUserByIdUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: GetUserByIdUseCase, useValue: {
          execute: () => { }
        }
      },
      {
        provide: AngularFireAuth, useValue: {
          auth: {
            signInWithEmailAndPassword: () => { },
            createUserWithEmailAndPassword: () => { },
            signOut: () => { }
          }
        }
      }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call sign in method one time', () => {
    const email = 'pepito@test.com';
    const password = '123456';
    const spy = spyOn(service, 'SignIn');

    service.SignIn(email, password);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call sign up method one time', () => {
    const email = 'pepito@test.com';
    const password = '123456';
    const spy = spyOn(service, 'SignUp');

    service.SignUp(email, password);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be logout', () => {
    const spy = spyOn(service, 'SignOut');
    expect(service.SignOut).toBeTruthy();
  });
});
