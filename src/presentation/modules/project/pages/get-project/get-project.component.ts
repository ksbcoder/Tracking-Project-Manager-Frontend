import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProjectByIdUseCase } from 'src/bussiness/useCases/project/getProjectById.usecase';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { UserModel } from 'src/domain/models/user/user.model';

@Component({
  selector: 'sofka-get-project',
  templateUrl: './get-project.component.html',
  styleUrls: ['./get-project.component.scss'],
})
export class GetProjectComponent implements OnInit {
  //routes
  routeList: string[];

  //variables
  render!: boolean;
  nameProject!: string;
  project!: ProjectModel;
  leader!: UserModel;
  createdAt!: string;
  openDate!: string;
  deadLine!: string;
  completedAt!: string;

  constructor(
    private getProjectById: GetProjectByIdUseCase,
    private getLeaderById: GetUserByIdUseCase,
    private route: ActivatedRoute
  ) {
    this.routeList = ['../../list'];
    this.getProject();
    setTimeout(() => {
      this.getLeader(this.project.leaderID);
    }, 100);
    setTimeout(() => {
      this.render = true;
    }, 400);
  }

  ngOnInit(): void {}

  //#region consults
  getLeader(uidUser: string): void {
    let subGet = this.getLeaderById.execute(uidUser).subscribe({
      next: (data) => (this.leader = data),
      error: (err) => console.log(err),
      complete: () => {
        subGet.unsubscribe();
      },
    });
  }

  getProject(): void {
    let subUpdate: any;
    let subParams = this.route.params.subscribe((params) => {
      subUpdate = this.getProjectById.execute(params['id']).subscribe({
        next: (data) => {
          (this.project = data),
            (this.createdAt = this.dateToString(data.createdAt)),
            (this.openDate = this.dateToString(data.openDate)),
            (this.deadLine = this.dateToString(data.deadLine)),
            (this.completedAt = this.dateToString(data.completedAt));
        },
        error: (err) => console.log(err),
        complete: () => {
          subParams.unsubscribe(), subUpdate.unsubscribe();
        },
      });
    });
  }
  //#endregion

  dateToString(date: Date): string {
    return date ? new Date(date).toISOString().substring(0, 10) : '';
  }
}
