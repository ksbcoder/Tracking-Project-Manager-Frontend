import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { ProjectModel } from 'src/domain/models/project/project.model';

export class GetAllProjectsUseCase implements UseCase<void, ProjectModel[]> {
  constructor(private projectRepository: ProjectRepository) {}

  execute(): Observable<ProjectModel[]> {
    return this.projectRepository.getAllProjectsAsync();
  }
}
