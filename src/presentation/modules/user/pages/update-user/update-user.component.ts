import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { UpdateUserUseCase } from 'src/bussiness/useCases/user/updateUser.usecase';

@Component({
  selector: 'sofka-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  //routes
  routeListUsers: string[];
  //variables
  frmUpdateUser: FormGroup;

  constructor(
    private getUserById: GetUserByIdUseCase,
    private updateUser: UpdateUserUseCase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeListUsers = ['../../list'];
    this.frmUpdateUser = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      efficiencyRate: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      tasksCompleted: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      role: new FormControl('', [Validators.required]),
      stateUser: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getUserById.execute(params['id']).subscribe({
        next: (data) => {
          this.frmUpdateUser.setValue({
            userName: data.userName,
            email: data.email,
            efficiencyRate: data.efficiencyRate,
            tasksCompleted: data.tasksCompleted,
            role: data.role,
            stateUser: data.stateUser,
          });
        },
        error: (err) => console.log(err),
      });
    });
  }

  sendData(): void {
    this.convertSelectsValuesToNumber();
    this.route.params.subscribe((params) => {
      console.log(this.frmUpdateUser.getRawValue());
      this.updateUser
        .execute({
          uidUser: params['id'],
          user: this.frmUpdateUser.getRawValue(),
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['dashboard/users/list']);
          },
          error: (err) => console.log(err),
        });
    });
  }

  convertSelectsValuesToNumber(): void {
    this.frmUpdateUser.controls['role'].setValue(
      Number(this.frmUpdateUser.controls['role'].value)
    );
    this.frmUpdateUser.controls['stateUser'].setValue(
      Number(this.frmUpdateUser.controls['stateUser'].value)
    );
  }
}
