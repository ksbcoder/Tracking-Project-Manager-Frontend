import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetUsersUseCase } from 'src/bussiness/useCases/user/getUsers.usecase';
import { UserModel } from 'src/domain/models/user/user.model';

@Component({
  selector: 'sofka-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  //routes
  routeDashboard: string[];
  //variables
  render!: boolean;
  usersList: UserModel[];
  empty: boolean;

  constructor(
    private getUsers: GetUsersUseCase,
    private toastr: ToastrService
  ) {
    this.routeDashboard = ['../../'];
    this.usersList = [];
    this.empty = false;
    setTimeout(() => {
      this.render = true;
    }, 400);
  }

  ngOnInit() {
    let subGet = this.getUsers.execute().subscribe({
      next: (data) => {
        this.usersList = data;
        this.empty = false;
      },
      error: (err) => {
        console.log(err);
        this.empty = true;
        this.toastr.error('Error loading users', '', {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
      },
      complete: () => {
        subGet.unsubscribe();
      },
    });
  }
}
