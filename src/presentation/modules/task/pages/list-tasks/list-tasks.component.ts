import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from 'src/domain/models/task/task.model';
import { GetTasksByUserIdUseCase } from '../../../../../bussiness/useCases/task/getTasksByUserId.usercase';
import { UserModel } from 'src/domain/models/user/user.model';
import { AssignTaskUseCase } from '../../../../../bussiness/useCases/task/assignTask.usercase';
import { GetUsersUseCase } from '../../../../../bussiness/useCases/user/getUsers.usecase';
import { GetAllTasksUseCase } from '../../../../../bussiness/useCases/task/getAllTasks.usercase';
import { CompleteTaskUseCase } from '../../../../../bussiness/useCases/task/completeTask.usercase';
import { DeleteTaskUseCase } from '../../../../../bussiness/useCases/task/deleteTask.usercase';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  render!: boolean;
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
    private deleteTaskUseCase: DeleteTaskUseCase,
    private toastr: ToastrService
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
    setTimeout(() => {
      this.render = true;
    }, 400);
  }
  //#endregion

  //#region ngOnInit
  ngOnInit(): void {
    switch (this.role) {
      case '1':
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
        next: (response) => {
          this.toastr.success('Task was assigned.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Task was not assigned.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.toastr.info('The contributor may not be registered.', '', {
            timeOut: 4500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
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
      next: (response) => {
        this.ngOnInit(),
          this.toastr.success('Task was completed.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Task was not completed.', '', {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
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
      next: (response) => {
        this.ngOnInit(),
          this.toastr.success('Task was deleted.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Task was not deleted.', '', {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
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
        this.toastr.info('There may not be any tasks yet.', '', {
          timeOut: 2500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
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
          this.toastr.info('There may not be any tasks yet.', '', {
            timeOut: 2500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        },
        complete: () => {
          subGetTaskByUser.unsubscribe();
        },
      });
  }

  getUsers() {
    let subGetUsers = this.getUsersUseCase.execute().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.log(err),
      complete: () => {
        subGetUsers.unsubscribe();
        this.users.forEach((user) => {
          let pos = this.users.indexOf(user);
          if (user.role == 1 || user.role == 0) {
            this.users.splice(pos, 1);
          }
        });
        if (this.users.length == 0) {
          this.toastr.info('There are no contributors registered.', '', {
            timeOut: 4500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        }
      },
    });
  }
  //#endregion
}
