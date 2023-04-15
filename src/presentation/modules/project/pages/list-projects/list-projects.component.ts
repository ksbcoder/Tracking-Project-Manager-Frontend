import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetProjectsByLeaderIdUseCase } from 'src/bussiness/useCases/project/getProjectsByLeaderId.usecase';
import { OpenProjectCommand } from 'src/domain/commands/project/openProjectCommand';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { OpenProjectUseCase } from '../../../../../bussiness/useCases/project/openProject.usecase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteProjectUseCase } from 'src/bussiness/useCases/project/deleteProject.usecase';
import { CompleteProjectUseCase } from '../../../../../bussiness/useCases/project/completeProject.usecase';

@Component({
  selector: 'sofka-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent implements OnInit {
  //routes
  routeDashboard: string[];
  routeCreate: string[];

  //variables
  projectsList: ProjectModel[];
  empty: boolean;
  opened: boolean;
  frmUpdate: FormGroup;

  //variables to emmit

  //update modal
  projectID!: string;
  name!: string;
  openProjectCommand!: OpenProjectCommand;

  //#region constructor
  constructor(
    private getProjectsByLeader: GetProjectsByLeaderIdUseCase,
    private openProjectUseCase: OpenProjectUseCase,
    private completeProjectUseCase: CompleteProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase
  ) {
    this.frmUpdate = new FormGroup({
      deadline: new FormControl('', [Validators.required]),
    });
    this.routeDashboard = ['../../'];
    this.routeCreate = ['../create'];
    this.projectsList = [];
    this.empty = false;
    this.opened = false;
    this.openProjectCommand = new OpenProjectCommand(new Date());
  }
  //#endregion

  //#region ngOnInit
  ngOnInit(): void {
    this.getProjectsByLeaderID();
  }
  //#endregion

  modal(projectID: string, name: string): void {
    this.projectID = projectID;
    this.name = name;
  }

  //#region open project with modal
  openProject(): void {
    let dateStr = this.frmUpdate.getRawValue().deadline;
    let dateToSend = new Date(dateStr);
    this.openProjectCommand.deadLine = dateToSend;

    let subOpen = this.openProjectUseCase
      .execute({ idProject: this.projectID, project: this.openProjectCommand })
      .subscribe({
        next: (data) => this.ngOnInit(),
        error: (err) => console.log(err),
      });
    setTimeout(() => {
      subOpen.unsubscribe();
    }, 500);
  }
  //#endregion

  //#region complete project with modal
  completeProject(projectID: string): void {
    let subComplete = this.completeProjectUseCase.execute(projectID).subscribe({
      next: (data) => this.ngOnInit(),
      error: (err) => console.log(err),
    });
    setTimeout(() => {
      subComplete.unsubscribe();
    }, 500);
  }
  //#endregion

  //#region delete with modal
  deleteProject(projectID: string): void {
    let subDelete = this.deleteProjectUseCase.execute(projectID).subscribe({
      next: (data) => this.ngOnInit(),
      error: (err) => console.log(err),
    });
    setTimeout(() => {
      subDelete.unsubscribe();
    }, 500);
  }
  //#endregion

  //#region consults
  getProjectsByLeaderID(): void {
    let idLeader = localStorage.getItem('uidUser') as string;
    let subGet = this.getProjectsByLeader.execute(idLeader).subscribe({
      next: (data) => {
        this.projectsList = data;
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
  //#endregion
}
