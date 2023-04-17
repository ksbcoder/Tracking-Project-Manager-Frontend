import { ProjectModel } from 'src/domain/models/project/project.model';
import { TaskModel } from 'src/domain/models/task/task.model';
import { UserModel } from 'src/domain/models/user/user.model';
import { GetTaskByIdUseCase } from '../../../../../bussiness/useCases/task/getTaskById.usercase';
import { GetProjectByIdUseCase } from '../../../../../bussiness/useCases/project/getProjectById.usecase';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sofka-get-task',
  templateUrl: './get-task.component.html',
  styleUrls: ['./get-task.component.scss'],
})
export class GetTaskComponent implements OnInit {
  //routes
  routeList: string[];

  //variables
  render!: boolean;
  project!: ProjectModel;
  leader!: UserModel;
  contributor!: UserModel;
  task!: TaskModel;
  createdAt: string;
  assignedAt: string;
  deadLine: string;
  completedAt: string;

  constructor(
    private getTaskByIdUseCase: GetTaskByIdUseCase,
    private getProjectByIdUseCase: GetProjectByIdUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.routeList = ['../../list'];
    this.createdAt = '';
    this.assignedAt = '';
    this.deadLine = '';
    this.completedAt = '';
    this.getTask();
    setTimeout(() => {
      this.getProject();
      this.getLeader();
      this.getContributor();
    }, 200);
    setTimeout(() => {
      this.render = true;
    }, 400);
  }

  ngOnInit(): void {}

  //#region  consults
  getTask(): void {
    let subGet: any;
    let subParams = this.route.params.subscribe((params) => {
      subGet = this.getTaskByIdUseCase.execute(params['id']).subscribe({
        next: (data) => {
          (this.task = data),
            (this.createdAt = this.dateToString(data.createdAt)),
            (this.assignedAt = this.dateToString(data.assignedAt)),
            (this.deadLine = this.dateToString(data.deadLine)),
            (this.completedAt = this.dateToString(data.completedAt));
        },
        error: (err) => {
          console.log(err),
            this.toastr.error('Error loading task', '', {
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

  getProject(): void {
    let subGet = this.getProjectByIdUseCase
      .execute(this.task.projectID)
      .subscribe({
        next: (data) => (this.project = data),
        error: (err) => console.log(err),
        complete: () => {
          subGet.unsubscribe();
        },
      });
  }

  getLeader(): void {
    let subGet = this.getUserByIdUseCase
      .execute(this.task.createdBy)
      .subscribe({
        next: (data) => (this.leader = data),
        error: (err) => console.log(err),
        complete: () => {
          subGet.unsubscribe();
        },
      });
  }

  getContributor(): void {
    if (this.task.assignedTo !== null) {
      let subGet = this.getUserByIdUseCase
        .execute(this.task.assignedTo)
        .subscribe({
          next: (data) => (this.contributor = data),
          error: (err) => console.log(err),
          complete: () => {
            subGet.unsubscribe();
          },
        });
    }
  }
  //#endregion

  dateToString(date: Date): string {
    return date ? new Date(date).toISOString().substring(0, 10) : '';
  }
}
