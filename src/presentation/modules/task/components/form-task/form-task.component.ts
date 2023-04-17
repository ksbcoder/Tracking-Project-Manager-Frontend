import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTaskCommand } from 'src/domain/commands/task/newTaskCommand';
import { UpdateTaskCommand } from 'src/domain/commands/task/updateTaskCommand';
import { GetProjectsByLeaderIdUseCase } from '../../../../../bussiness/useCases/project/getProjectsByLeaderId.usecase';
import { GetTaskByIdUseCase } from '../../../../../bussiness/useCases/task/getTaskById.usercase';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTaskUseCase } from 'src/bussiness/useCases/task/createTask.usercase';
import { UpdateTaskUseCase } from 'src/bussiness/useCases/task/updateTask.usercase';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { UserModel } from 'src/domain/models/user/user.model';
import { GetUsersUseCase } from '../../../../../bussiness/useCases/user/getUsers.usecase';

@Component({
  selector: 'sofka-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss'],
})
export class FormTaskComponent implements OnInit {
  @Input() formType!: string;

  //variables
  frmTask: FormGroup;

  //variables select projects
  projects: ProjectModel[];
  projectSaved!: string;
  selectedProject: string;
  leaderID: string;

  //varibles select users
  users: UserModel[];
  selectedUser: string;
  assignedToID!: string;
  taskToCreate!: NewTaskCommand;
  taskToUpdate!: UpdateTaskCommand;

  //#region constructor
  constructor(
    private getProjectsByLeaderIdUseCase: GetProjectsByLeaderIdUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private getTaskByIdUseCase: GetTaskByIdUseCase,
    private createTask: CreateTaskUseCase,
    private updateTask: UpdateTaskUseCase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projects = [];
    this.selectedProject = '';
    this.users = [];
    this.selectedUser = '';
    this.leaderID = localStorage.getItem('uidUser') as string;
    this.frmTask = new FormGroup({
      projectID: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      deadLine: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      assignedTo: new FormControl(''),
      assignedAt: new FormControl(''),
    });
  }
  //#endregion

  //#region on init (formPreload)
  ngOnInit(): void {
    //consult for selects
    this.getProjectsByLeader();
    this.getUsers();
    if (this.formType == 'update') {
      let subGet: any;
      let subParams = this.route.params.subscribe((params) => {
        subGet = this.getTaskByIdUseCase.execute(params['id']).subscribe({
          next: (data) => {
            this.frmTask.setValue({
              projectID: data.projectID,
              description: data.description,
              deadLine:
                data.deadLine != null
                  ? new Date(data.deadLine).toISOString().substring(0, 10)
                  : null,
              priority: data.priority,
              assignedTo: data.assignedTo,
              assignedAt:
                data.assignedAt != null
                  ? new Date(data.assignedAt).toISOString().substring(0, 10)
                  : null,
            });
            this.projectSaved = data.projectID;
            this.assignedToID = data.assignedTo;
          },
          error: (err) => console.log(err),
          complete: () => {
            subGet.unsubscribe();
            subParams.unsubscribe();
          },
        });
      });
    }
  }
  //#endregion

  //#region send data
  sendData(): void {
    this.convertSelectsValuesToNumber();
    if (this.formType == 'create') {
      this.taskToCreate = {
        projectID: this.frmTask.value.projectID,
        description: this.frmTask.value.description,
        createdBy: localStorage.getItem('uidUser') as string,
        deadline: this.frmTask.value.deadLine,
        priority: this.frmTask.value.priority,
      };
      let subCreate = this.createTask.execute(this.taskToCreate).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['../list'], { relativeTo: this.route });
        },
        error: (err) => console.log(err),
        complete: () => {
          subCreate.unsubscribe();
        },
      });
    } else if (this.formType == 'update') {
      let subParams = this.route.params.subscribe((params) => {
        this.taskToUpdate = {
          projectID: this.frmTask.value.projectID,
          description: this.frmTask.value.description,
          deadline: this.frmTask.value.deadLine,
          priority: this.frmTask.value.priority,
          assignedTo: this.frmTask.value.assignedTo,
          assignedAt: this.frmTask.value.assignedAt,
        };
        let subTask = this.updateTask
          .execute({ idTask: params['id'], task: this.taskToUpdate })
          .subscribe({
            next: (data) => {
              this.router.navigate(['../../list'], { relativeTo: this.route });
            },
            error: (err) => console.log(err),
            complete: () => {
              subTask.unsubscribe();
              subParams.unsubscribe();
            },
          });
      });
    }
  }
  //#endregion

  //#region consults
  getProjectsByLeader() {
    let subGetProjects = this.getProjectsByLeaderIdUseCase
      .execute(this.leaderID)
      .subscribe({
        next: (data) => {
          (this.projects = data),
            this.projects.forEach((project) => {
              let pos = this.projects.indexOf(project);
              if (project.phase == null) {
                this.projects.splice(pos, 1);
              }
            });
        },
        error: (err) => console.log(err),
        complete: () => {
          subGetProjects.unsubscribe();
        },
      });
  }

  getUsers() {
    let subGetUsers = this.getUsersUseCase.execute().subscribe({
      next: (data) => {
        this.users = data;
        this.users.forEach((user) => {
          let pos = this.users.indexOf(user);
          if (user.role == 0 || user.role == 1) {
            this.users.splice(pos, 1);
          }
        });
      },
      error: (err) => console.log(err),
      complete: () => {
        subGetUsers.unsubscribe();
      },
    });
  }
  //#endregion

  convertSelectsValuesToNumber(): void {
    this.frmTask.controls['priority'].setValue(
      Number(this.frmTask.controls['priority'].value)
    );
  }
}
