import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTaskCommand } from 'src/domain/commands/task/newTaskCommand';
import { UpdateTaskCommand } from 'src/domain/commands/task/updateTaskCommand';
import { GetTaskByIdUseCase } from '../../../../../bussiness/useCases/task/getTaskById.usercase';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTaskUseCase } from 'src/bussiness/useCases/task/createTask.usercase';
import { UpdateTaskUseCase } from 'src/bussiness/useCases/task/updateTask.usercase';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { UserModel } from 'src/domain/models/user/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetProjectsActiveByLeaderIdUseCase } from 'src/bussiness/useCases/project/getProjectsActiveByLeaderId.usecase';
import { GetActiveUsersUseCase } from 'src/bussiness/useCases/user/getActiveUsers.usecase';

@Component({
  selector: 'sofka-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss'],
})
export class FormTaskComponent implements OnInit {
  @Input() formType!: string;

  //variables
  render!: boolean;
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
    private getProjectsActiveByLeaderIdUseCase: GetProjectsActiveByLeaderIdUseCase,
    private getActiveUsersUseCase: GetActiveUsersUseCase,
    private getTaskByIdUseCase: GetTaskByIdUseCase,
    private createTask: CreateTaskUseCase,
    private updateTask: UpdateTaskUseCase,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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
    setTimeout(() => {
      this.render = true;
    }, 400);
  }
  //#endregion

  //#region on init (formPreload)
  ngOnInit(): void {
    //consult for selects
    this.getProjectsActiveByLeader();
    this.getActiveUsers();
    if (this.formType == 'update') {
      let subGet: any;
      let subParams = this.route.params.subscribe((params) => {
        subGet = this.getTaskByIdUseCase.execute(params['id']).subscribe({
          next: (data) => {
            this.selectedProject = '';
            if (this.projects.length != 0) {
              this.selectedProject = data.projectID;
            }
            this.selectedUser = data.assignedTo;
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
          error: (err) => {
            console.log(err),
              this.toastr.error(
                'Error loading task data, please try again.',
                '',
                {
                  timeOut: 3500,
                  positionClass: 'toast-top-center',
                }
              );
          },
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
          this.toastr.success('Task created successfully.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.router.navigate(['../list'], { relativeTo: this.route });
        },
        error: (err) => {
          console.log(err),
            this.toastr.error('Task was no created.', '', {
              timeOut: 3500,
              positionClass: 'toast-bottom-right',
              closeButton: true,
            });
          this.toastr.warning('Project Open? Check the project deadline.', '', {
            timeOut: 4500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        },
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
              this.toastr.success('Task updated successfully.', '', {
                timeOut: 3500,
                positionClass: 'toast-bottom-right',
                closeButton: true,
              });
              this.router.navigate(['../../list'], { relativeTo: this.route });
            },
            error: (err) => {
              console.log(err),
                this.toastr.error('Task was no updated.', '', {
                  timeOut: 3500,
                  positionClass: 'toast-bottom-right',
                  closeButton: true,
                });
              this.toastr.warning(
                'Project Open? Check the project deadline.',
                '',
                {
                  timeOut: 4500,
                  positionClass: 'toast-bottom-right',
                  closeButton: true,
                }
              );
            },
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
  getProjectsActiveByLeader() {
    let subGetProjects = this.getProjectsActiveByLeaderIdUseCase
      .execute(this.leaderID)
      .subscribe({
        next: (data) => (this.projects = data),
        error: (err) => {
          console.log(err)
          if (this.projects.length == 0) {
            this.toastr.info('No projects opened or active.', '', {
              timeOut: 2500,
              positionClass: 'toast-bottom-right',
              closeButton: true,
            });
          }
        },
        complete: () => {
          subGetProjects.unsubscribe();
        },
      });
  }

  getActiveUsers() {
    let subGetUsers = this.getActiveUsersUseCase.execute().subscribe({
      next: (data) => this.users = data,
      error: (err) => {
        console.log(err)
        if (this.users.length == 0) {
          this.toastr.info('No contributors available.', '', {
            timeOut: 2500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        }
      },
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
