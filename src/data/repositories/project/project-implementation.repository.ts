import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { NewProjectDTO } from 'src/domain/DTO/project/newProjectDTO';
import { UpdateProjectDTO } from 'src/domain/DTO/project/updateProjectDTO';
import { NewProjectCommand } from 'src/domain/commands/project/newProjectCommand';
import { OpenProjectCommand } from 'src/domain/commands/project/openProjectCommand';
import { UpdateProjectCommand } from 'src/domain/commands/project/updateProjectCommand';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectImplementationRepository extends ProjectRepository {
  constructor(private http: HttpClient) {
    super();
  }

  createProjectAsync(project: NewProjectCommand): Observable<NewProjectDTO> {
    return this.http.post<NewProjectDTO>(
      environment.urlApiProjects + 'Project',
      project
    );
  }
  deleteProjectAsync(idProject: string): Observable<UpdateProjectDTO> {
    return this.http.delete<UpdateProjectDTO>(
      environment.urlApiProjects + 'Project/ID?idProject=' + idProject
    );
  }
  getProjectByIdAsync(idProject: string): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(
      environment.urlApiProjects + 'Project/ID?idProject=' + idProject
    );
  }

  getProjectsByLeaderIdAsync(idLeader: string): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(
      environment.urlApiProjects + 'Project/LeaderID?leaderId=' + idLeader
    );
  }

  getProjectsActiveByLeaderIdAsync(idLeader: string): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(
      environment.urlApiProjects + 'Project/Active/LeaderID?leaderId=' + idLeader
    );
  }

  getActiveProjectsAsync(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(
      environment.urlApiProjects + 'Project/ActiveOnly'
    );
  }
  getAllProjectsAsync(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(
      environment.urlApiProjects + 'Project/AllNoDeleted'
    );
  }
  updateProjectAsync(params: {
    idProject: string;
    project: UpdateProjectCommand;
  }): Observable<UpdateProjectDTO> {
    return this.http.put<UpdateProjectDTO>(
      environment.urlApiProjects + 'Project/ID?idProject=' + params.idProject,
      params.project
    );
  }
  openProjectAsync(params: {
    idProject: string;
    idLeader: string;
    project: OpenProjectCommand;
  }): Observable<UpdateProjectDTO> {
    return this.http.put<UpdateProjectDTO>(
      environment.urlApiProjects +
      'Project/OpenProject/ID?idProject=' +
      params.idProject + '&uidUser=' + params.idLeader,
      params.project
    );
  }
  completeProjectAsync(idProject: string): Observable<UpdateProjectDTO> {
    return this.http.put<UpdateProjectDTO>(
      environment.urlApiProjects +
      'Project/CompleteProject/ID?idProject=' +
      idProject,
      null
    );
  }
}
