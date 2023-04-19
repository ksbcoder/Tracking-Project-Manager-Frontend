import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { CreateProjectUseCase } from 'src/bussiness/useCases/project/createProject.usecase';
import { DeleteProjectUseCase } from 'src/bussiness/useCases/project/deleteProject.usecase';
import { GetActiveProjectsUseCase } from 'src/bussiness/useCases/project/getActiveProjects.usecase';
import { GetAllProjectsUseCase } from 'src/bussiness/useCases/project/getAllProjects.usecase';
import { GetProjectByIdUseCase } from 'src/bussiness/useCases/project/getProjectById.usecase';
import { UpdateProjectUseCase } from 'src/bussiness/useCases/project/updateProject.usecase';
import { ProjectImplementationRepository } from './project-implementation.repository';
import { CompleteProjectUseCase } from '../../../bussiness/useCases/project/completeProject.usecase';
import { OpenProjectUseCase } from '../../../bussiness/useCases/project/openProject.usecase';
import { GetProjectsByLeaderIdUseCase } from 'src/bussiness/useCases/project/getProjectsByLeaderId.usecase';
import { GetProjectsActiveByLeaderIdUseCase } from '../../../bussiness/useCases/project/getProjectsActiveByLeaderId.usecase';

const CreateProjectUseCaseFactory = (projectRepo: ProjectRepository) =>
  new CreateProjectUseCase(projectRepo);
export const CreateProjectUseCaseProvider = {
  provide: CreateProjectUseCase,
  useFactory: CreateProjectUseCaseFactory,
  deps: [ProjectRepository],
};

const DeleteProjectUseCaseFactory = (projectRepo: ProjectRepository) =>
  new DeleteProjectUseCase(projectRepo);
export const DeleteProjectUseCaseProvider = {
  provide: DeleteProjectUseCase,
  useFactory: DeleteProjectUseCaseFactory,
  deps: [ProjectRepository],
};

const GetProjectByIdUseCaseFactory = (projectRepo: ProjectRepository) =>
  new GetProjectByIdUseCase(projectRepo);
export const GetProjectByIdUseCaseProvider = {
  provide: GetProjectByIdUseCase,
  useFactory: GetProjectByIdUseCaseFactory,
  deps: [ProjectRepository],
};

const GetProjectsByLeaderIdUseCaseFactory = (projectRepo: ProjectRepository) =>
  new GetProjectsByLeaderIdUseCase(projectRepo);
export const GetProjectsByLeaderIdUseCaseProvider = {
  provide: GetProjectsByLeaderIdUseCase,
  useFactory: GetProjectsByLeaderIdUseCaseFactory,
  deps: [ProjectRepository],
};

const GetProjectsActiveByLeaderIdUseCaseFactory = (projectRepo: ProjectRepository) =>
  new GetProjectsActiveByLeaderIdUseCase(projectRepo);
export const GetProjectsActiveByLeaderIdUseCaseProvider = {
  provide: GetProjectsActiveByLeaderIdUseCase,
  useFactory: GetProjectsActiveByLeaderIdUseCaseFactory,
  deps: [ProjectRepository],
};

const GetActiveProjectsUseCaseFactory = (projectRepo: ProjectRepository) =>
  new GetActiveProjectsUseCase(projectRepo);
export const GetActiveProjectsUseCaseProvider = {
  provide: GetActiveProjectsUseCase,
  useFactory: GetActiveProjectsUseCaseFactory,
  deps: [ProjectRepository],
};

const GetAllProjectsUseCaseFactory = (projectRepo: ProjectRepository) =>
  new GetAllProjectsUseCase(projectRepo);
export const GetAllProjectsUseCaseProvider = {
  provide: GetAllProjectsUseCase,
  useFactory: GetAllProjectsUseCaseFactory,
  deps: [ProjectRepository],
};

const UpdateProjectUseCaseFactory = (projectRepo: ProjectRepository) =>
  new UpdateProjectUseCase(projectRepo);
export const UpdateProjectUseCaseProvider = {
  provide: UpdateProjectUseCase,
  useFactory: UpdateProjectUseCaseFactory,
  deps: [ProjectRepository],
};

const OpenProjectUseCaseFactory = (projectRepo: ProjectRepository) =>
  new OpenProjectUseCase(projectRepo);
export const OpenProjectUseCaseProvider = {
  provide: OpenProjectUseCase,
  useFactory: OpenProjectUseCaseFactory,
  deps: [ProjectRepository],
};

const CompleteProjectUseCaseFactory = (projectRepo: ProjectRepository) =>
  new CompleteProjectUseCase(projectRepo);
export const CompleteProjectUseCaseProvider = {
  provide: CompleteProjectUseCase,
  useFactory: CompleteProjectUseCaseFactory,
  deps: [ProjectRepository],
};

@NgModule({
  providers: [
    CreateProjectUseCaseProvider,
    DeleteProjectUseCaseProvider,
    GetProjectByIdUseCaseProvider,
    GetProjectsByLeaderIdUseCaseProvider,
    GetProjectsActiveByLeaderIdUseCaseProvider,
    GetActiveProjectsUseCaseProvider,
    GetAllProjectsUseCaseProvider,
    UpdateProjectUseCaseProvider,
    OpenProjectUseCaseProvider,
    CompleteProjectUseCaseProvider,
    { provide: ProjectRepository, useClass: ProjectImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ProjectModule { }
