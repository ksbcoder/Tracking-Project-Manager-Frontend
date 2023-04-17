import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from 'src/domain/models/task/task.model';
import { GetTasksByUserIdUseCase } from '../../../../../bussiness/useCases/task/getTasksByUserId.usercase';
import { UserModel } from 'src/domain/models/user/user.model';
import { AssignTaskUseCase } from '../../../../../bussiness/useCases/task/assignTask.usercase';
import { GetUsersUseCase } from '../../../../../bussiness/useCases/user/getUsers.usecase';
import { GetAllTasksUseCase } from '../../../../../bussiness/useCases/task/getAllTasks.usercase';
import { CompleteTaskUseCase } from '../../../../../bussiness/useCases/task/completeTask.usercase';
import { DeleteTaskUseCase } from '../../../../../bussiness/useCases/task/deleteTask.usercase';

@Component({
  selector: 'sofka-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  //routes
  routeDashboard: string[];
  routeCreate: string[];

  //varibles select users
  users: UserModel[];
  selectedUserAssign: string = '';

  //variables
  tasksList: TaskModel[];
  frmTask: FormGroup;
  empty: boolean;
  role: string;
  leaderID!: string;
  userID!: string;

  //variables modal
  taskID!: number;
  description?: string;

  //#region constructor
  constructor(
    private getAllTasksUseCase: GetAllTasksUseCase,
    private getTasksByUserIdUseCase: GetTasksByUserIdUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private assignTaskUseCase: AssignTaskUseCase,
    private completeTaskUseCase: CompleteTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase
  ) {
    this.routeDashboard = ['../../'];
    this.routeCreate = ['../create'];
    this.tasksList = [];
    this.users = [];
    this.empty = false;
    this.role = localStorage.getItem('role') || '';
    this.leaderID = localStorage.getItem('uidUser') || '';
    this.userID = localStorage.getItem('uidUser') || '';
    this.frmTask = new FormGroup({
      assignedTo: new FormControl('', [Validators.required]),
    });
  }
  //#endregion

  //#region ngOnInit
  ngOnInit(): void {
    switch (this.role) {
      case '1':
        // this.getUnassignedTasks(this.leaderID);
        this.getUsers();
        this.getAllTasks();
        break;
      case '2':
        this.getTasksByUser(this.userID);
        break;
      default:
        break;
    }
  }
  //#endregion

  modal(taskID: number, description?: string): void {
    this.taskID = taskID;
    this.description = description;
  }

  //#region assign task
  assignTask(): void {
    let subAssignTask = this.assignTaskUseCase
      .execute({
        idTask: this.taskID,
        uidUser: this.frmTask.getRawValue().assignedTo,
      })
      .subscribe({
        next: (response) => this.ngOnInit(),
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          subAssignTask.unsubscribe();
        },
      });
  }
  //#endregion

  //#region complete task
  completeTask(taskID: number): void {
    let subCompleteTask = this.completeTaskUseCase.execute(taskID).subscribe({
      next: (response) => this.ngOnInit(),
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        subCompleteTask.unsubscribe();
      },
    });
  }
  //#endregion

  //#region delete task
  deleteTask(taskID: number): void {
    let subDeleteTask = this.deleteTaskUseCase.execute(taskID).subscribe({
      next: (response) => this.ngOnInit(),
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        subDeleteTask.unsubscribe();
      },
    });
  }
  //#endregion

  //#region consults
  getAllTasks() {
    let subGetAllTasks = this.getAllTasksUseCase.execute().subscribe({
      next: (response) => {
        this.tasksList = response;
        this.empty = false;
      },
      error: (error) => {
        console.log(error);
        this.empty = true;
      },
      complete: () => {
        subGetAllTasks.unsubscribe();
      },
    });
  }

  getTasksByUser(userID: string): void {
    let subGetTaskByUser = this.getTasksByUserIdUseCase
      .execute(userID)
      .subscribe({
        next: (response) => {
          this.tasksList = response;
          this.empty = false;
        },
        error: (error) => {
          console.log(error);
          this.empty = true;
        },
        complete: () => {
          subGetTaskByUser.unsubscribe();
        },
      });
  }

  getUsers() {
    let subGetUsers = this.getUsersUseCase.execute().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (err) => console.log(err),
      complete: () => {
        subGetUsers.unsubscribe();
        this.users.forEach((user) => {
          let pos = this.users.indexOf(user);
          if (user.role == 1 || user.role == 0) {
            console.log('este juera ' + user.userName);
            this.users.splice(pos, 1);
          }
        });
      },
    });
  }
  //#endregion
}
