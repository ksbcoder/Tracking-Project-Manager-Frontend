import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectUseCase } from 'src/bussiness/useCases/project/createProject.usecase';
import { GetProjectByIdUseCase } from 'src/bussiness/useCases/project/getProjectById.usecase';
import { UpdateProjectUseCase } from 'src/bussiness/useCases/project/updateProject.usecase';
import { NewProjectCommand } from 'src/domain/commands/project/newProjectCommand';
import { UpdateProjectCommand } from 'src/domain/commands/project/updateProjectCommand';

@Component({
  selector: 'sofka-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss'],
})
export class FormProjectComponent implements OnInit {
  @Input() formType!: string;

  //variables
  render!: boolean;
  frmProject: FormGroup;
  projectToCreate!: NewProjectCommand;
  projectToUpdate!: UpdateProjectCommand;

  //#region constructor
  constructor(
    private getProjectById: GetProjectByIdUseCase,
    private createProject: CreateProjectUseCase,
    private updateProject: UpdateProjectUseCase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.frmProject = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      deadLine: new FormControl(''),
      stateProject: new FormControl(''),
    });
    setTimeout(() => {
      this.render = true;
    }, 400);
  }
  //#endregion

  //#region on init (formPreload)
  ngOnInit(): void {
    if (this.formType == 'update') {
      let subGet: any;
      let subParams = this.route.params.subscribe((params) => {
        subGet = this.getProjectById.execute(params['id']).subscribe({
          next: (data) => {
            this.frmProject.setValue({
              name: data.name,
              description: data.description,
              deadLine:
                data.deadLine != null
                  ? new Date(data.deadLine).toISOString().substring(0, 10)
                  : null,
              stateProject: data.stateProject,
            });
          },
          error: (err) => console.log(err),
          complete: () => {
            subParams.unsubscribe();
            subGet.unsubscribe();
          },
        });
      });
    }
  }
  //#endregion

  //#region send data
  sendData(): void {
    switch (this.formType) {
      case 'create':
        //project to create
        this.projectToCreate = {
          leaderID: localStorage.getItem('uidUser') as string,
          name: this.frmProject.value.name,
          description: this.frmProject.value.description,
        };
        //create project
        let subCreate = this.createProject
          .execute(this.projectToCreate)
          .subscribe({
            next: (data) => {
              this.router.navigate(['../list'], { relativeTo: this.route });
            },
            error: (err) => console.log(err),
            complete: () => {
              subCreate.unsubscribe();
            },
          });
        break;
      case 'update':
        //project to update
        this.convertSelectsValuesToNumber();
        this.projectToUpdate = {
          leaderID: localStorage.getItem('uidUser') as string,
          name: this.frmProject.value.name,
          description: this.frmProject.value.description,
          deadLine: this.frmProject.value.deadLine,
          stateProject: this.frmProject.value.stateProject,
        };
        let subUpdate: any;
        let subParams = this.route.params.subscribe((params) => {
          subUpdate = this.updateProject
            .execute({
              idProject: params['id'],
              project: this.projectToUpdate,
            })
            .subscribe({
              next: (data) =>
                this.router.navigate(['../../list'], {
                  relativeTo: this.route,
                }),
              error: (err) => console.log(err),
              complete: () => {
                subParams.unsubscribe();
                subUpdate.unsubscribe();
              },
            });
        });
        break;
      default:
        break;
    }
  }
  //#endregion

  convertSelectsValuesToNumber(): void {
    this.frmProject.controls['stateProject'].setValue(
      Number(this.frmProject.controls['stateProject'].value)
    );
  }
}
