import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  render!: boolean;

  //#region constructor
  constructor(
    private getUserById: GetUserByIdUseCase,
    private updateUser: UpdateUserUseCase,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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
    setTimeout(() => {
      this.render = true;
    }, 400);
  }
  //#endregion

  //#region on init (formPreload)
  ngOnInit(): void {
    let subGet: any;
    let subParams = this.route.params.subscribe((params) => {
      subGet = this.getUserById.execute(params['id']).subscribe({
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
        error: (err) => {
          console.log(err),
            this.toastr.error('Error loading user info.', '', {
              timeOut: 3500,
              positionClass: 'toast-bottom-right',
              closeButton: true,
            });
        },
        complete: () => {
          subGet.unsubscribe();
          subParams.unsubscribe();
        },
      });
    });
  }
  //#endregion

  //#region send data
  sendData(): void {
    this.convertSelectsValuesToNumber();
    let subUpdate: any;
    let subParams = this.route.params.subscribe((params) => {
      subUpdate = this.updateUser
        .execute({
          uidUser: params['id'],
          user: this.frmUpdateUser.getRawValue(),
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['../../list'], { relativeTo: this.route });
            this.toastr.success('User updated successfully.', '', {
              timeOut: 3500,
              positionClass: 'toast-bottom-right',
              closeButton: true,
            });
          },
          error: (err) => {
            console.log(err),
              this.toastr.error('Error updating user.', '', {
                timeOut: 3500,
                positionClass: 'toast-bottom-right',
                closeButton: true,
              });
          },
          complete: () => {
            subUpdate.unsubscribe();
            subParams.unsubscribe();
          },
        });
    });
  }
  //#endregion

  convertSelectsValuesToNumber(): void {
    this.frmUpdateUser.controls['role'].setValue(
      Number(this.frmUpdateUser.controls['role'].value)
    );
    this.frmUpdateUser.controls['stateUser'].setValue(
      Number(this.frmUpdateUser.controls['stateUser'].value)
    );
  }
}
