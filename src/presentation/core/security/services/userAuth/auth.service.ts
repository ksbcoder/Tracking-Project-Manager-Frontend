import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
// import { StateService } from '../../../../shared/services/state.service';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { CreateUserUseCase } from 'src/bussiness/useCases/user/createUser.usecase';
import { NewUserCommand } from 'src/domain/commands/user/newUserCommand';
import { UserModel } from 'src/domain/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private getUserUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private afAuth: AngularFireAuth // private state$: StateService
  ) {}

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      localStorage.setItem('uidUser', result.user?.uid as string);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // consumo de api
      let userData!: UserModel;
      const userDB = await this.getUserUseCase.execute(
        localStorage.getItem('uidUser') as string
      );

      await new Promise((resolve) => setTimeout(resolve, 1200));

      userDB.subscribe({
        next: (data) => {
          userData = data;
        },
        error: (err) => {
          console.log(err);
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));

      this.afAuth.authState.subscribe((user) => {
        if (user && userData != undefined) {
          localStorage.setItem(
            'userName',
            userData.userName ? userData.userName : 'User'
          );
          localStorage.setItem('email', userData.email);
          localStorage.setItem(
            'efficiencyRate',
            userData.efficiencyRate.toString()
          );
          localStorage.setItem(
            'tasksCompleted',
            userData.tasksCompleted.toString()
          );
          localStorage.setItem('role', userData.role.toString());
          localStorage.setItem('stateUser', userData.stateUser.toString());
          this.router.navigate(['dashboard']);
        }
      });
    } catch (error) {
      window.alert(error);
    }
  }
  // Sign up with email/password
  async SignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      localStorage.setItem(
        'userName',
        result.user?.displayName ? result.user?.displayName : 'User'
      );
      localStorage.setItem(
        'email',
        result.user?.email ? result.user.email : 'user@mail.com'
      );
      localStorage.setItem('uidUser', result.user?.uid as string);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // consumo de api
      let userData!: UserModel;
      const userDB = await this.getUserUseCase.execute(
        localStorage.getItem('uidUser') as string
      );

      await new Promise((resolve) => setTimeout(resolve, 1200));

      userDB.subscribe({
        next: (data) => {
          userData = data;
        },
        error: (err) => {
          console.log(err);
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (userData != undefined) {
        localStorage.setItem(
          'userName',
          userData.userName ? userData.userName : 'User'
        );
        localStorage.setItem(
          'efficiencyRate',
          userData.efficiencyRate.toString()
        );
        localStorage.setItem(
          'tasksCompleted',
          userData.tasksCompleted.toString()
        );
        localStorage.setItem('role', userData.role.toString());
        localStorage.setItem('stateUser', userData.stateUser.toString());
        this.router.navigate(['dashboard']);
      } else {
        await this.createUserUseCase
          .execute(
            new NewUserCommand(
              localStorage.getItem('uidUser') as string,
              localStorage.getItem('userName') as string,
              localStorage.getItem('email') as string
            )
          )
          .subscribe({
            next: (data) => {
              localStorage.setItem(
                'userName',
                userData.userName ? userData.userName : 'User'
              );
              localStorage.setItem(
                'efficiencyRate',
                data.efficiencyRate.toString()
              );
              localStorage.setItem(
                'tasksCompleted',
                data.tasksCompleted.toString()
              );
              localStorage.setItem('role', data.role.toString());
              localStorage.setItem('stateUser', data.stateUser.toString());
            },
            error: (err) => {
              console.log(err);
            },
          });
        this.router.navigate(['dashboard']);
      }
    } catch (error) {
      window.alert(error);
    }
  }

  // Sign in with Google
  async GoogleAuth() {
    const res = await this.AuthLogin(new auth.GoogleAuthProvider());
    this.router.navigate(['dashboard']);
  }
  // Auth logic to run auth providers
  private async AuthLogin(provider: any) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      localStorage.setItem('userName', result.user?.displayName as string);
      localStorage.setItem('uidUser', result.user?.uid as string);
      localStorage.setItem('email', result.user?.email as string);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // consumo de api
      let userData!: UserModel;
      const userDB = this.getUserUseCase.execute(
        localStorage.getItem('uidUser') as string
      );

      await new Promise((resolve) => setTimeout(resolve, 1200));

      userDB.subscribe({
        next: (data) => {
          userData = data;
        },
        error: (err) => {
          console.log(err);
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (userData != undefined) {
        localStorage.setItem(
          'efficiencyRate',
          userData.efficiencyRate.toString()
        );
        localStorage.setItem(
          'tasksCompleted',
          userData.tasksCompleted.toString()
        );
        localStorage.setItem('role', userData.role.toString());
        localStorage.setItem('stateUser', userData.stateUser.toString());
        this.router.navigate(['dashboard']);
      } else {
        this.createUserUseCase
          .execute(
            new NewUserCommand(
              localStorage.getItem('uidUser') as string,
              localStorage.getItem('userName') as string,
              localStorage.getItem('email') as string
            )
          )
          .subscribe({
            next: (data) => {
              localStorage.setItem(
                'efficiencyRate',
                data.efficiencyRate.toString()
              );
              localStorage.setItem(
                'tasksCompleted',
                data.tasksCompleted.toString()
              );
              localStorage.setItem('role', data.role.toString());
              localStorage.setItem('stateUser', data.stateUser.toString());
            },
            error: (err) => {
              console.log(err);
            },
          });
        this.router.navigate(['dashboard']);
      }
    } catch (error) {
      window.alert(error);
    }
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('uidUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('efficiencyRate');
    localStorage.removeItem('tasksCompleted');
    localStorage.removeItem('role');
    localStorage.removeItem('stateUser');
    this.router.navigate(['sign-in']);
  }
}
