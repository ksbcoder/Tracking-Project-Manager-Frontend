import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/userAuth/auth.service';

@Component({
  selector: 'sofka-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  routeSingUp: string[];
  frmLogin: FormGroup;
  constructor(private readonly auth$: AuthService) {
    this.clearLocalStorage();
    this.routeSingUp = ['sign-up'];
    this.frmLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  ngOnInit(): void {}

  auth(): void {
    this.auth$.GoogleAuth();
  }

  signIn(user: string, password: string): void {
    this.auth$.SignIn(user, password);
  }

  signUp(user: string, password: string): void {
    this.auth$.SignUp(user, password);
  }

  clearLocalStorage(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('uidUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('efficiencyRate');
    localStorage.removeItem('tasksCompleted');
    localStorage.removeItem('role');
    localStorage.removeItem('stateUser');
  }
}
