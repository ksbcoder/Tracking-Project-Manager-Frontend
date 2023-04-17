import { Component, OnInit } from '@angular/core';
import { GetAllProjectsUseCase } from '../../../../../bussiness/useCases/project/getAllProjects.usecase';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sofka-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //variables
  render!: boolean;
  projects!: ProjectModel[];

  constructor(
    private getAllProjectsUseCase: GetAllProjectsUseCase,
    private toastr: ToastrService
  ) {
    setTimeout(() => {
      this.render = true;
    }, 400);
  }

  ngOnInit(): void {
    let subGetAllProjects = this.getAllProjectsUseCase.execute().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.render = true;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error loading projects', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
      },
      complete: () => {
        subGetAllProjects.unsubscribe();
      },
    });
  }
}
