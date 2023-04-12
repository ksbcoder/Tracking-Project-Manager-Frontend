import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/userAuth/auth.service';

@Component({
  selector: 'sofka-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  routeSingUp: string[];
  frmLogin: FormGroup;
  constructor(private readonly auth$: AuthService) {
    this.routeSingUp = ['sign-up'];
    this.frmLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  auth(): void {
    this.auth$.GoogleAuth();
  }

  signIn(user: string, password: string): void {
    this.auth$.SignIn(user, password);
  }

  signUp(user: string, password: string): void {
    this.auth$.SignUp(user, password);
  }
}
