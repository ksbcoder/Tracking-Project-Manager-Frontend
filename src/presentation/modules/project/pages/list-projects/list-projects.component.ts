import { GetProjectsByLeaderIdUseCase } from 'src/bussiness/useCases/project/getProjectsByLeaderId.usecase';
import { OpenProjectCommand } from 'src/domain/commands/project/openProjectCommand';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { OpenProjectUseCase } from '../../../../../bussiness/useCases/project/openProject.usecase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteProjectUseCase } from 'src/bussiness/useCases/project/deleteProject.usecase';
import { CompleteProjectUseCase } from '../../../../../bussiness/useCases/project/completeProject.usecase';
import { GetActiveProjectsUseCase } from 'src/bussiness/useCases/project/getActiveProjects.usecase';
import { InscriptionModel } from 'src/domain/models/inscription/inscription.model';
import { GetInscriptionByUserIdUseCase } from 'src/bussiness/useCases/inscription/getInscriptionByUserId.usecase';
import { CreateInscriptionUseCase } from 'src/bussiness/useCases/inscription/createInscription.usecase';
import { NewInscriptionCommand } from 'src/domain/commands/inscription/newInscriptionCommand';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  render!: boolean;
  projectsList: ProjectModel[];
  inscription!: InscriptionModel;
  inscriptionToCreate!: NewInscriptionCommand;
  empty: boolean;
  opened: boolean;
  frmUpdate: FormGroup;
  role: string;
  uidUser: string;

  //variables to emmit

  //update modal
  projectID!: string;
  name!: string;
  openProjectCommand!: OpenProjectCommand;

  //#region constructor
  constructor(
    private getProjectsByLeader: GetProjectsByLeaderIdUseCase,
    private getActiveProjectsUseCase: GetActiveProjectsUseCase,
    private openProjectUseCase: OpenProjectUseCase,
    private completeProjectUseCase: CompleteProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase,
    private getInscriptionByUserUseCase: GetInscriptionByUserIdUseCase,
    private createInscription: CreateInscriptionUseCase,
    private toastr: ToastrService
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
    this.role = localStorage.getItem('role') || '';
    this.uidUser = localStorage.getItem('uidUser') || '';
    setTimeout(() => {
      this.render = true;
    }, 400);
  }
  //#endregion

  //#region ngOnInit
  ngOnInit(): void {
    switch (this.role) {
      case '1':
        this.getProjectsByLeaderID();
        break;
      case '2':
        this.getActiveProjects();
        break;
      default:
        break;
    }
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
      .execute({ idProject: this.projectID, idLeader: this.uidUser, project: this.openProjectCommand })
      .subscribe({
        next: (data) => {
          this.ngOnInit();
          this.toastr.success('Project opened successfully.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        },
        error: (err) => {
          this.toastr.error('Project was not opened.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.toastr.info(
            'You may only have one project open at a time.',
            '',
            {
              timeOut: 4500,
              positionClass: 'toast-bottom-right',
              closeButton: true,
            }
          );
        },
        complete: () => {
          subOpen.unsubscribe();
        },
      });
  }
  //#endregion

  //#region complete project with modal
  completeProject(projectID: string): void {
    let subComplete = this.completeProjectUseCase.execute(projectID).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.toastr.success('Project successfully completed.', '', {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Project was not completed.', '', {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
        this.toastr.warning('All tasks must be completed.', '', {
          timeOut: 4500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
      },
      complete: () => {
        subComplete.unsubscribe();
      },
    });
  }
  //#endregion

  //#region delete with modal
  deleteProject(projectID: string): void {
    let subDelete = this.deleteProjectUseCase.execute(projectID).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.toastr.success('Project successfully deleted.', '', {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Project was not deleted.', '', {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
      },
      complete: () => {
        subDelete.unsubscribe();
      },
    });
  }
  //#endregion

  //#region inscription with modal
  joinToProject(projectID: string): void {
    this.inscriptionToCreate = new NewInscriptionCommand(
      projectID,
      this.uidUser
    );
    let subInscription = this.createInscription
      .execute(this.inscriptionToCreate)
      .subscribe({
        next: (data) => {
          this.ngOnInit();
          this.toastr.success('You have been registered successfully.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('You have not been registered.', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.toastr.info(
            'You may already be registered for this project.',
            '',
            {
              timeOut: 4500,
              positionClass: 'toast-bottom-right',
              closeButton: true,
            }
          );
        },
        complete: () => {
          subInscription.unsubscribe();
        },
      });
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
        this.toastr.info('You have no projects.', '', {
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

  getActiveProjects(): void {
    let subGet = this.getActiveProjectsUseCase.execute().subscribe({
      next: (data) => {
        this.projectsList = data;
        this.empty = false;
      },
      error: (err) => {
        console.log(err);
        this.empty = true;
        this.toastr.info('There are no projects.', '', {
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

  getInscriptionByUser(): void {
    let idUser = localStorage.getItem('uidUser') as string;
    let subGet = this.getInscriptionByUserUseCase.execute(idUser).subscribe({
      next: (data) => {
        this.inscription = data;
        this.toastr.warning('Projects loadedasasasd', '', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
      },
      error: (err) => {
        this.toastr.warning('There is no inscription yours', '', {
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
  //#endregion
}
