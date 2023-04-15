import { Component, OnInit } from '@angular/core';
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
  usersList: UserModel[];
  empty: boolean;

  constructor(private getUsers: GetUsersUseCase) {
    this.routeDashboard = ['../../'];
    this.usersList = [];
    this.empty = false;
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
      },
    });
    setTimeout(() => {
      subGet.unsubscribe();
    }, 500);
  }
}
