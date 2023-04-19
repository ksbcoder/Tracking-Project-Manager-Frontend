import { Observable } from 'rxjs';
import { NewProjectDTO } from 'src/domain/DTO/project/newProjectDTO';
import { UpdateProjectDTO } from 'src/domain/DTO/project/updateProjectDTO';
import { NewProjectCommand } from 'src/domain/commands/project/newProjectCommand';
import { OpenProjectCommand } from 'src/domain/commands/project/openProjectCommand';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { UpdateProjectCommand } from '../../../domain/commands/project/updateProjectCommand';

export abstract class ProjectRepository {
  abstract createProjectAsync(
    project: NewProjectCommand
  ): Observable<NewProjectDTO>;

  abstract deleteProjectAsync(idProject: string): Observable<UpdateProjectDTO>;

  abstract getProjectByIdAsync(idProject: string): Observable<ProjectModel>;

  abstract getProjectsByLeaderIdAsync(
    idLeader: string
  ): Observable<ProjectModel[]>;

  abstract getProjectsActiveByLeaderIdAsync(
    idLeader: string
  ): Observable<ProjectModel[]>;

  abstract getActiveProjectsAsync(): Observable<ProjectModel[]>;

  abstract getAllProjectsAsync(): Observable<ProjectModel[]>;

  abstract updateProjectAsync(params: {
    idProject: string;
    project: UpdateProjectCommand;
  }): Observable<UpdateProjectDTO>;

  abstract openProjectAsync(params: {
    idProject: string;
    project: OpenProjectCommand;
  }): Observable<UpdateProjectDTO>;

  abstract completeProjectAsync(
    idProject: string
  ): Observable<UpdateProjectDTO>;
}
