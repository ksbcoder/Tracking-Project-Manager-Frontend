import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProjectsByLeaderIdUseCase } from 'src/bussiness/useCases/project/getProjectsByLeaderId.usecase';
import { OpenProjectCommand } from 'src/domain/commands/project/openProjectCommand';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { OpenProjectUseCase } from '../../../../../bussiness/useCases/project/openProject.usecase';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sofka-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent implements OnInit {
  //routes
  routeDashboard: string[];

  //variables
  projectsList: ProjectModel[];
  empty: boolean;
  opened: boolean;
  frmUpdate: FormGroup;

  //update modal
  projectID!: string;
  name!: string;
  openProjectCommand!: OpenProjectCommand;

  //#region constructor
  constructor(
    private getProjectsByLeader: GetProjectsByLeaderIdUseCase,
    private openProjectUseCase: OpenProjectUseCase
  ) {
    this.frmUpdate = new FormGroup({
      deadline: new FormControl('', [Validators.required]),
    });
    this.routeDashboard = ['../../'];
    this.projectsList = [];
    this.empty = false;
    this.opened = false;
    this.openProjectCommand = new OpenProjectCommand(new Date());
  }
  //#endregion

  //#region ngOnInit
  ngOnInit(): void {
    let idLeader = localStorage.getItem('uidUser') as string;
    this.getProjectsByLeader.execute(idLeader).subscribe({
      next: (data) => {
        this.projectsList = data;
        this.empty = false;
      },
      error: (err) => {
        console.log(err);
        this.empty = true;
      },
    });
  }
  //#endregion

  //#region update with modal
  modal(projectID: string, name: string): void {
    this.projectID = projectID;
    this.name = name;
  }

  openProject(): void {
    let dateStr = this.frmUpdate.getRawValue().deadline;
    let dateToSend = new Date(dateStr);
    this.openProjectCommand.deadLine = dateToSend;
    this.openProjectUseCase
      .execute({ idProject: this.projectID, project: this.openProjectCommand })
      .subscribe({
        next: (data) => {
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  //#endregion
}
